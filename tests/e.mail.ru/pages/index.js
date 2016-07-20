'use strict';

let helpers = require('../utils/helpers');
let account = require('../utils/account');
let URL = require('../utils/url');

let cache = {
	session : false,
	features: []
};

/** @namespace browser */
class PageObject {
	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '#LEGO'
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
	 * Дождаться появления требуемого элемента
	 *
	 * @returns {boolean}
	 */
	wait () {
		return this.page.waitForExist(this.locators.container, this.waitTime);
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
	 * Открытие страницы
	 *
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query = {}) {
		let { features } = cache;

		if (features.length) {
			query.ftrs = features.join(' ');
		}

		let url = URL.format(this.location, query);

		this.page.url(url);
		this.wait();

		if (cache.session) {
			return account.isActiveUser();
		}

		return true;
	}

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
	 * Расширяет объект
	 *
	 * @param {Object} object
	 * @returns {Object}
	 */
	extend (object) {
		return helpers.extend(...arguments);
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
	 * Откладывает выполнение следюущего шага на заданное время
	 *
	 * @param {number} ms
	 */
	pause (ms) {
		this.page.pause(ms);
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
		this.page.deleteCookie();
		// this.page.reload();
	}

	/**
	 * Получить элемент контейнера
	 *
	 * @returns {Element}
	 */
	getContainerElement () {
		return this.page.element(this.locators.container);
	}
}

module.exports = PageObject;
