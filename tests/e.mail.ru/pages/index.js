'use strict';

let Store = require('../store');
let URL = require('../utils/url');

/** @namespace browser */
class PageObject {
	constructor () {
		this.store = new Store();
	}

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
	 * Открытие страницы
	 *
	 * @param {string} path — метод запроса
	 * @param {Object} [query] — параметры запроса
	 */
	open (path, query) {
		let url = URL.request(...arguments);

		this.page.url(url);
	}

	/**
	 * Дождаться появления требуемого элемента
	 *
	 * @returns {boolean}
	 */
	wait () {
		return this.page.waitForExist(this.locators.container);
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
	 * Авторизация
	 *
	 * @param {string} type — типа авторизации
	 */
	auth (type) {
		let { account } = this.store;

		this.page.url('/login');

		let login = account.get('login');
		let cookie = account.get('cookies');

		this.page.setCookies(cookie);
		console.log(`Used ${login} account`);
	}
}

module.exports = PageObject;
