import * as merge from 'deepmerge';
import * as Debug from 'debug';
import {Credentials} from '@qa/account-manager';
import account, {UserType} from '../utils/account';
import URL from '../utils/url';
import config from '../config';

let debug = Debug('@qa:yoda');
const TIMEOUT: number = 15 * 1000;

export interface Query {
	ftrs?: string;
	[query: string]: any;
}

interface Cache {
	session?: Credentials;
	scripts : string[];
	features: string[];
}

let cache: Cache = {
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
	public readonly name: string = null;

	/**
	 * Авторизация
	 *
	 * @param {string} [type] — тип авторизации
	 * @param {Object} [credentials] — авторизационые данные
	 */
	static auth (type?: UserType, credentials?: Credentials): Credentials {
		return cache.session = account.session(type, credentials);
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
	 * Локейшн
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
	extend <T>(x: T, y: any, options?: any): T {
		return merge(x, y, options);
	}

	/**
	 * Получить элемент контейнера
	 *
	 * @returns {WebdriverIO.Client<string>}
	 */
	getContainerElement (): WebdriverIO.ElementLink {
		return browser.element(this.locators.container);
	}

	/**
	 * Дождаться появления требуемого элемента
	 * @param {String} [locator] - указать необходимый локатор самостоятельно
	 * @param {Boolean} [reverse=false]
	 * @param {Number} [ms]
	 */
	wait (locator?: string, ms?: number, reverse: boolean = false): void {
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
		}
		else {
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
	url (url: string, query: Query = {}, timeout: number = TIMEOUT): string {
		let { features, scripts } = cache;

		if (features.length) {
			query.ftrs = features.join(' ');
		}

		url = URL.format(url, query);

		URL.open(url, TIMEOUT);

		// Выполнить требуемые скрипты
		scripts.forEach(file => {
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
	 * @returns {boolean}
	 */
	open (path?: string | Query, query: Query = {}): { state: boolean, url: string } {
		if (typeof path === 'object' && path !== null) {
			query = path;
			path = undefined;
		}

		if (!path) {
			path = this.location;
		}

		let state = true;
		let url = this.url(path as string, query);
		let qaCookie = browser.getCookie().find(cookie => cookie.name === 'qa');
		// Проверяем авторизацию используя портальное API
		if (cache.session) {
			state = account.isActiveUser();
		}
		if (!qaCookie) {
			debug('Выставляем тестовую куку для страниц, которые не используют авторизацию')
			browser.setCookie(<WebdriverIO.Cookie>{
				path: '/',
				name: 'qa',
				value: config.cookies.qa,
				domain: '.mail.ru'
			});
			// на всякий случай рефреш
			browser.refresh();
		}

		// http://canary.win105.dev.mail.ru/
		//browser.setCookie(<WebdriverIO.Cookie>{
		//	path: '/',
		//	name: 'canary',
		//	value: config.cookies.canary
		//});

		return { state, url };
	}

	/** Включение произвольного скрипта в код страницы */
	inject (list: string[]): string[] {
		cache.scripts.push(...list);

		return list;
	}

	/**
	 * Включение фичи
	 * @param {string[]} list — список фич, которые требуется включить
	 */
	features (list: string[]): string[] {
		cache.features.push(...list);

		return list;
	}

	/**
	 * Перезагружает текущую страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	refresh (query: Query = {}): void {
		let url = browser.getUrl();

		this.url(url, query);
	}

	/**
	 * Метод проверяет видимость заданного основного контейнера
	 *
	 * @returns {boolean}
	 */
	isVisible (): boolean {
		return browser.isVisible(this.locators.container);
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
