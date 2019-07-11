import { Credentials } from '@qa/account-manager';
import * as Debug from 'debug';
import * as merge from 'deepmerge';
import account, { UserType } from '../utils/account';
import Authorization from '../utils/authorization';
import URL from '../utils/url';

const debug = Debug('@qa:yoda');
const TIMEOUT: number = 15 * 1000;

export interface Query {
	ftrs?: string | string[];
	[query: string]: any;
}

interface Cache {
	session?: Credentials;
	scripts: string[];
	features: string[];
}

const cache: Cache = {
	scripts : [],
	features: []
};

/**
 * @class PageObject
 */
class PageObject {
	/**
	 * Имя страницы
	 * @override this
	 * @type {string}
	 */
	public readonly name: string | null;

	/**
	 * Авторизация
	 *
	 * @param {string} [type] — тип авторизации
	 * @param {Object} [credentials] — авторизационые данные
	 */
	static auth(type?: UserType, credentials?: Credentials): Credentials {
		return cache.session = account.session(type, credentials);
	}

	/**
	 * Локаторы
	 *
	 * @type {Yoda.Locators}
	 */
	get locators(): Yoda.Locators {
		return {
			container: 'body'
		};
	}

	/**
	 * Локейшн
	 *
	 * @type {string}
	 */
	get location(): Yoda.Location {
		return '/';
	}

	/**
	 * Ссылка на объект страницы
	 *
	 * @type {WebdriverIO.Client<void>}
	 */
	get page(): WebdriverIO.Client<void> {
		return browser;
	}

	/**
	 * Расширяет объект
	 *
	 * @property {Object} x
	 * @property {Object} y
	 * @returns {Object}
	 */
	extend <T>(x: T, y: any, options?: any): T {
		return merge(x, y, options);
	}

	/**
	 * Получить элемент контейнера
	 *
	 * @returns {WebdriverIO.Client<string>}
	 */
	getContainerElement(): WebdriverIO.ElementLink {
		return browser.element(this.locators.container);
	}

	/**
	 * Дождаться появления требуемого элемента
	 * @param {String} [locator] - указать необходимый локатор самостоятельно
	 * @param {Boolean} [reverse=false]
	 * @param {Number} [ms]
	 */
	wait(locator?: string, ms?: number, reverse: boolean = false): void {
		let container = null;

		if (!locator) {
			// Игнорируем обращения к локаторам если исключение возникает
			// до вызова степа в самом тесте
			try {
				({ container } = this.locators);
			} catch (error) {
				if (error.name !== 'TypeError') {
					throw error;
				}
			}
		} else {
			container = locator;
		}

		debug('wait for the required element', container);

		if (container) {
			browser.waitForExist(container, ms, reverse);
		} else {
			throw new Error('It seems you forgot to define the container element');
		}
	}

	/**
	 * Перейти по урлу
	 *
	 * @param {string} url — url
	 * @param {Object} [query] — параметры запроса
	 * @param {number} [timeout] — время ожидания
	 * @return {string} url
	 */
	url(url: string, query: Query = {}, timeout: number = TIMEOUT): string {
		const { features, scripts } = cache;

		if (features.length) {
			query.ftrs = features.concat(query.ftrs!).join(' ').trim();
		}

		url = URL.format(url, query);

		URL.open(url, TIMEOUT);

		// Выполнить требуемые скрипты
		scripts.forEach((file) => {
			browser.timeouts('script', TIMEOUT);
			browser.execute(file);
		});

		return url;
	}

	/**
	 * Открытие страницы
	 *
	 * @param {string|Query} [path] - путь, который нужно подставить к location
	 * @param {Object} [query] — параметры запроса
	 * @returns {{state: boolean, url: string}}
	 */
	open(path?: string | Query, query: Query = {}): { state: boolean, url: string } {
		if (typeof path === 'object' && path !== null) {
			query = path;
			path = undefined;
		}

		if (!path) {
			path = this.location;
		}

		const naviData = Authorization.loadNaviData();
		const state = naviData.status === 'ok';

		const url = this.url(path as string, query);

		return { state, url };
	}

	/** Включение произвольного скрипта в код страницы */
	inject(list: string[]): string[] {
		cache.scripts.push(...list);

		return list;
	}

	/**
	 * Включение фичи
	 * @param {string[]} list — список фич, которые требуется включить
	 * @param {boolean} overwrite - перезаписать вместо предыдущего списка фич
	 */
	features(list: string[], overwrite: boolean = false): string[] {
		if (overwrite) {
			cache.features = [];
		}

		cache.features.push(...list);

		return list;
	}

	/**
	 * Перезагружает текущую страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	refresh(query: Query = {}): void {
		const url = browser.getUrl();

		this.url(url, query);
	}

	/**
	 * Метод проверяет видимость заданного основного контейнера
	 *
	 * @returns {boolean}
	 */
	isVisible(): boolean {
		return browser.isVisible(this.locators.container);
	}

	/**
	 * Предотвращает показ модального окна события beforeunload
	 */
	disableConfirm(): void {
		browser.execute(() => {
			window.onbeforeunload = null;
		});
	}

	/**
	 * Нажатие одной кнопки кливиатуры с помощью Actions APIs
	 * https://w3c.github.io/webdriver/#actions
	 * http://webdriver.io/api/protocol/actions.html
	 * Метод, работающий в фф, но пока не поддержаный в хроме
	 */
	pressKeyAction(key: string) {
		(browser as any).actions([{
			type: 'key',
			id: Date.now().toString(),
			actions: [
				{ type: 'keyDown', value: key },
				{ type: 'pause', duration: 100 },
				{ type: 'keyUp', value: key }
			]
		}]);
	}

	/**
	 * ОДНОВРЕМЕНННОЕ нажатие двух кнопок кливиатуры с помощью Actions APIs
	 * https://w3c.github.io/webdriver/#actions
	 * http://webdriver.io/api/protocol/actions.html
	 * Метод, работающий в фф, но пока не поддержаный в хроме
	 */
	pressTwoKeysAction(key1: string, key2: string) {
		(browser as any).actions([{
			type: 'key',
			id: Date.now().toString(),
			actions: [
				{ type: 'keyDown', value: key1 },
				{ type: 'keyDown', value: key2 },
				{ type: 'pause', duration: 100 },
				{ type: 'keyUp', value: key2 },
				{ type: 'keyUp', value: key1 }
			]
		}]);
	}

	/**
	 * ОДНОВРЕМЕНННОЕ нажатие трех кнопок кливиатуры с помощью Actions APIs
	 * https://w3c.github.io/webdriver/#actions
	 * http://webdriver.io/api/protocol/actions.html
	 * Метод, работающий в фф, но пока не поддержаный в хроме
	 */
	pressThreeKeysAction(key1: string, key2: string, key3: string) {
		(browser as any).actions([{
			type: 'key',
			id: Date.now().toString(),
			actions: [
				{ type: 'keyDown', value: key1 },
				{ type: 'keyDown', value: key2 },
				{ type: 'keyDown', value: key3 },
				{ type: 'pause', duration: 100 },
				{ type: 'keyUp', value: key3 },
				{ type: 'keyUp', value: key2 },
				{ type: 'keyUp', value: key1 }
			]
		}]);
	}

	/**
	 * Перемещение курсора с помощью Actions APIs
	 * https://w3c.github.io/webdriver/#actions
	 * http://webdriver.io/api/protocol/actions.html
	 * Метод, работающий в фф, но пока не поддержаный в хроме
	 * В тестах используйте moveToElement (см. ниже)
	 */
	moveToObjectAction(locator?: string, xoffset: number = 0, yoffset: number = 0) {
		const target = { x: xoffset, y: yoffset };
		const randomActionId = Date.now().toString();
		if (locator) {
			const location = browser.getLocation(locator);
			target.x += location.x;
			target.y += location.y;
		}
		(browser as any).actions([{
			type: 'pointer',
			id: randomActionId,
			parameters: {
				pointerType: 'mouse'
			},
			actions: [
				{ type: 'pointerMove', x: Math.round(target.x), y: Math.round(target.y) }
			]
		}]);
	}

	/**
	 * Клик по кнопкам мыши с помощью Actions APIs
	 * https://w3c.github.io/webdriver/#actions
	 * http://webdriver.io/api/protocol/actions.html
	 * Метод, работающий в фф, но пока не поддержаный в хроме
	 * В тестах используйте rightClickElement, leftClickElement (см. ниже)
	 */
	mouseClickAction(mouseButton: 'right' | 'left', locator: string, xoffset: number = 0, yoffset: number = 0) {
		const target = { x: xoffset, y: yoffset };
		const button = mouseButton === 'right' ? 2 : 0;
		const randomActionId = Date.now().toString();
		if (locator) {
			const location = browser.getLocation(locator);
			target.x += location.x;
			target.y += location.y;
		}
		(browser as any).actions([{
			type: 'pointer',
			id: randomActionId,
			parameters: {
				pointerType: 'mouse'
			},
			actions: [
				{ type: 'pointerMove', x: Math.round(target.x), y: Math.round(target.y) },
				{ type: 'pointerDown', button },
				{ type: 'pause', duration: 100 },
				{ type: 'pointerUp', button }
			]
		}]);
	}

	/**
	 * Перемещение курсора, работюащее и в фф, и в хроме
	 */
	moveToElement(locator: string = 'body', xoffset?: number, yoffset?: number) {
		if (browser.desiredCapabilities.browserName === 'firefox') {
			this.moveToObjectAction(locator, xoffset, yoffset);
		} else {
			browser.moveToObject(locator, xoffset, yoffset);
		}
	}

	/**
	 * Клик ПКМ, работюащий и в фф, и в хроме
	 */
	rightClickElement(locator: string, xoffset?: number, yoffset?: number) {
		if (browser.desiredCapabilities.browserName === 'firefox') {
			this.mouseClickAction('right', locator, xoffset, yoffset);
		} else {
			browser.rightClick(locator, xoffset, yoffset);
		}
	}

	/**
	 * Клик ЛКМ, работюащий и в фф, и в хроме
	 */
	leftClickElement(locator: string, xoffset?: number, yoffset?: number) {
		if (browser.desiredCapabilities.browserName === 'firefox') {
			this.mouseClickAction('left', locator, xoffset, yoffset);
		} else {
			browser.leftClick(locator, xoffset, yoffset);
		}
	}
}

export default PageObject;
