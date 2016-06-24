'use strict';

let Store = require('../store');
let URL = require('../utils/url');

/** @namespace browser */
class PageObject {
	constructor () {
		this.store = new Store();
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
	 * Авторизация
	 *
	 * @param {string} type — типа авторизации
	 */
	auth (type) {
		let { account } = this.store;

		let cookie = account.get('cookies');
		let login = account.get('login');

		console.log(`Used ${login} account`);

		this.page.url('/');
		this.page.setCookies(cookie);
	}
}

module.exports = PageObject;
