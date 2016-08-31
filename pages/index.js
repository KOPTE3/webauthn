'use strict';

let merge = require('deepmerge');
let account = require('../utils/account');
let URL = require('../utils/url');

let cache = {
	session : false,
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

		let { user, features } = cache;

		if (features.length) {
			query.ftrs = features.join(' ');
		}

		let url = URL.format(path, query);

		this.page.url(url);
		this.wait();

		if (cache.session) {
			return account.isActiveUser();
		}

		return true;
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
	 * Обновить страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	refresh (query = {}) {
		let { features } = cache;
		let url = this.page.getUrl();

		if (features.length) {
			query.ftrs = features.join(' ');
		}

		url = URL.format(url, query);

		this.page.url(url);
	}

	/** Сбросить текущую сессию */
	reload () {
		this.page.reload();
	}

	/**
	 * Расширяет объект
	 *
	 * @property {Object} x
	 * @property {Object} y
	 * @returns {Object}
	 */
	extend (/** x, y */) {
		return merge(...arguments);
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
	 * Установить размер окна
	 *
	 * @property {number} width
	 * @property {number} height
	 */
	setViewportSize ({width = 1200, height = 600}) {
		this.page.setViewportSize({ width, height });
	}

	/**
	 * Переключиться на ближайшую вкладку
	 */
	switchToNextTab () {
		this.page.switchToNextTab();
	}

	/**
	 * удаляем обработчик onbeforeunload
	 */
	offOnbeforeunload () {
		this.page.execute(function () {
			window.onbeforeunload = null;
		});
	}
}

module.exports = PageObject;
