'use strict';

let merge = require('deepmerge');
let account = require('../utils/account');
let URL = require('../utils/url');

let cache = {
	session : false,
	scripts : [],
	features: []
};

/** @namespace browser */
class PageObject {
	/**
	 * Авторизация
	 *
	 * @param {string} type — тип авторизации
	 * @param {Object} [credentials] — авторизационые данные
	 */
	static auth (type, credentials) {
		cache.session = account.session(...arguments);
	}

	/**
	 * Регистрация нового пользователя
	 *
	 * @param {Object} [user] - параметры как в api
	 * @returns {Promise}
	 */
	static register (user) {
		return account.register(user);
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: 'body'
		};
	}

	/**
	 * Ссылка на объект страницы
	 *
	 * @type {Promise}
	 */
	get page () {
		return browser;
	}

	/**
	 * Получить заголовок страницы
	 *
	 * @type {string}
	 */
	get title () {
		this.page.getTitle();
	}

	/**
	 * Получить элемент контейнера
	 *
	 * @returns {Element}
	 */
	getContainerElement () {
		return this.page.element(this.locators.container);
	}

	/**
	 * Дождаться появления требуемого элемента
	 *
	 * @returns {boolean}
	 */
	wait () {
		return this.page.waitForVisible(this.locators.container);
	}

	/**
	 * Открытие страницы
	 *
	 * @param {string} [path] - путь, который нужно подставить к location
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (path, query = {}) {
		if (typeof path === 'object' && path !== null) {
			query = path;
			path = null;
		}

		if (!path) {
			path = this.location;
		}

		this.url(path, query);
		this.wait();

		if (cache.session) {
			return account.isActiveUser();
		}

		return true;
	}

	/** Выполнить скрипт после page.url */
	inject () {
		cache.scripts.push(arguments);
	}

	/**
	 * Включение фичи
	 *
	 * @param {Array} list — список фич, которые требуется включить
	 */
	features (list) {
		cache.features.push(...list);
	}

	/**
	 * Перезагружает текущую страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	refresh (query = {}) {
		this.url(this.page.getUrl(), query);
	}

	/** Сбросить текущую сессию */
	reload () {
		this.page.reload();
	}

	/**
	 * Перейти по урлу
	 *
	 * @param {string} url — url
	 * @param {Object} [query] — параметры запроса
	 */
	url (url, query = {}) {
		let { features, scripts } = cache;

		if (features.length) {
			query.ftrs = features.join(' ');
		}

		url = URL.format(url, query);

		this.page.url(url);

		scripts.forEach(file => {
			this.page.execute(...file);
		});
	}

	/**
	 * Дожидается требуемного адреса
	 *
	 * @param {string|RegExp|Function} value
	 * @param {string} [query]
	 * @param {number|string} [options] — timeout, revert
	 * @returns {boolean}
	 */
	waitForUrl (value, query, ...options) {
		if (typeof value === 'string') {
			value = URL.format(...arguments);
		}

		try {
			return this.page.waitForUrl(value, ...options);
		} catch (error) {
			return false;
		}
	}

	/**
	 * Метод проверяет видимость заданного основного контейнера
	 *
	 * @returns {boolean}
	 */
	isVisible () {
		return this.page.isVisible(this.locators.container);
	}

	/**
	 * Откладывает выполнение следюущего шага на заданное время
	 *
	 * @param {number} ms
	 */
	pause (ms) {
		this.page.pause(ms);
	}

	/** Подтвердить алерт */
	alertAccept () {
		this.page.alertAccept();
	}

	/**
	 * Получить текст алерта
	 *
	 * @returns {string}
	 */
	getAlertText () {
		return this.page.alertText();
	}

	/**
	 * Установить размер окна
	 *
	 * @property {number} width
	 * @property {number} height
	 */
	setViewportSize ({ width = 1200, height = 600 }) {
		this.page.setViewportSize({ width, height });
	}

	/**
	 * Получить размер вьюпорта
	 *
	 * @returns {Object} {width, height}
	 */
	getViewportSize () {
		return this.page.getViewportSize();
	}

	/**
	 * Переключиться на ближайшую вкладку
	 */
	switchToNextTab () {
		this.page.switchToNextTab();
	}

	/**
	 * Предотвращает показ модального окна события beforeunload
	 */
	disableConfirm () {
		this.page.execute(function () {
			window.onbeforeunload = null;
		});
	}

	/**
	 * Регрессионное сравнение документа
	 *
	 * @see browser.checkDocument
	 * @see browser.saveDocumentScreenshot
	 * @param {Object} options
	 * @returns {Array}
	 */
	compareDocument (options) {
		return this.page.checkDocument(options);
	}

	/**
	 * Регрессионное сравнение вьюпорта
	 *
	 * @see browser.checkViewport
	 * @see browser.saveViewportScreenshot
	 * @param {Object} options
	 * @returns {Array}
	 */
	compareViewport (options) {
		return this.page.checkViewport(options);
	}

	/**
	 * Регрессионное сравнение элемента
	 *
	 * @see browser.checkElement
	 * @see browser.saveElementScreenshot
	 * @param {string} locator
	 * @param {Object} options
	 * @returns {Array}
	 */
	compareElement (locator, options) {
		return this.page.checkElement(options);
	}

	/**
	 * Дождаться выполнения какого-либо действия
	 * Если событие асинхронное, то колбек должен иметь имя async
	 *
	 * Пример:
	 *
	 * waitUntil(function async () {
	 *    // ...
	 * }, 10 * 1000, 'Время на выполнение операции вышло');
	 *
	 * @see browser.waitUntil
	 * @param {Function} callback
	 * @param {number} [timeout]
	 * @param {string} message
	 * @returns {(Promise|Object)}
	 */
	waitUntil (callback, timeout, message) {
		return this.page.waitUntil(...arguments);
	}

	/**
	 * Расширяет объект
	 *
	 * @deprecated
	 * @property {Object} x
	 * @property {Object} y
	 * @returns {Object}
	 */
	extend (/** x, y */) {
		return merge(...arguments);
	}
}

module.exports = PageObject;
