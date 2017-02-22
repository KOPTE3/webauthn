import * as merge from 'deepmerge';
import * as Debug from 'debug';
import account from '../utils/account';
import URL from '../utils/url';

let debug = Debug('@qa:yoda');
const TIMEOUT: number = 15 * 1000;

export interface Query {
	ftrs?: string;
	[query: string]: any;
}

interface Cache {
	session : boolean,
	scripts : string[],
	features: string[]
}

let cache: Cache = {
	session : false,
	scripts : [],
	features: []
};

/**
 * @class PageObject
 **/
class PageObject {
	/**
	 * Авторизация
	 *
	 * @param {string} [type] — тип авторизации
	 * @param {Object} [credentials] — авторизационые данные
	 */
	static auth (type?: string, credentials?: AccountManager.Credentials): void {
		cache.session = account.session(type, credentials);
	}

	/**
	 * Локаторы
	 *
	 * @type {Yoda.Locators}
	 */
	get locators (): Yoda.Locators {
		return {
			container: 'body'
		};
	}

	/**
	 * Локаторы
	 *
	 * @type {string}
	 */
	get location (): Yoda.Location {
		return '/';
	}

	/**
	 * Ссылка на объект страницы
	 *
	 * @type {WebdriverIO.Client<void>}
	 */
	get page (): WebdriverIO.Client<void> {
		return browser;
	}

	/**
	 * Расширяет объект
	 *
	 * @property {Object} x
	 * @property {Object} y
	 * @returns {Object}
	 */
	extend <T>(x: T, y: T, options?: any): T {
		return merge(x, y, options);
	}

	/**
	 * Получить элемент контейнера
	 *
	 * @returns {WebdriverIO.Client<string>}
	 */
	getContainerElement (): WebdriverIO.ElementLink {
		return this.page.element(this.locators.container);
	}

	/**
	 * Дождаться появления требуемого элемента
	 */
	wait (): void {
		let container = null;

		// Игнорируем обращения к локаторам если исключение возникает
		// до вызова степа в самом тесте
		try {
			({ container } = this.locators);
		} catch (error) {
			if (error.name !== 'TypeError') {
				throw error;
			}
		}

		debug('wait for the required element', container);

		browser.waitForVisible(container);
	}

	/**
	 * Перейти по урлу
	 *
	 * @param {string} url — url
	 * @param {Object} [query] — параметры запроса
	 * @param {number} [timeout] — время ожидания
	 */
	url (url: string, query: Query = {}, timeout: number = TIMEOUT): void {
		let { features, scripts } = cache;

		if (features.length) {
			query.ftrs = features.join(' ');
		}

		url = URL.format(url, query);

		URL.open(url, TIMEOUT);

		// Выполнить требуемые скрипты
		scripts.forEach(file => {
			this.page.timeouts('script', TIMEOUT);
			this.page.execute(file);
		});
	}

	/**
	 * Открытие страницы
	 *
	 * @param {string} [path] - путь, который нужно подставить к location
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (path?: string, query: Query = {}): boolean {
		if (typeof path === 'object' && path !== null) {
			query = path;
			path = null;
		}

		if (!path) {
			path = this.location;
		}

		this.url(path, query);

		// Проверяем авторизацию используя портальное API
		if (cache.session) {
			return account.isActiveUser();
		}

		return true;
	}

	/** Включение произвольного скрипта в код страницы */
	inject (list: string[]): void {
		cache.scripts.push(...list);
	}

	/**
	 * Включение фичи
	 * @param {string[]} list — список фич, которые требуется включить
	 */
	features (list: string[]): void {
		cache.features.push(...list);
	}

	/**
	 * Перезагружает текущую страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	refresh (query: Query = {}): void {
		let url = this.page.getUrl();

		this.url(url, query);
	}

	/**
	 * Дожидается требуемного адреса
	 *
	 * @param {string|RegExp|Function} value
	 * @param {number} [timeout]
	 * @param {boolean} [revert]
	 * @returns {boolean}
	 */

	/**
	 * Метод проверяет видимость заданного основного контейнера
	 *
	 * @returns {boolean}
	 */
	isVisible (): boolean {
		return this.page.isVisible(this.locators.container);
	}

	/**
	 * Предотвращает показ модального окна события beforeunload
	 */
	disableConfirm (): void {
		browser.execute(function () {
			window.onbeforeunload = null;
		});
	}
}

export default PageObject;
