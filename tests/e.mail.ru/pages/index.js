'use strict';

let Log = require('tir');
let Store = require('../store');
let URL = require('../utils/url');

/** @namespace browser */
class PageObject {
	constructor () {
		this.store = new Store();
	}

	/**
	 * Открытие страницы
	 *
	 * @param {string} path — метод запроса
	 * @param {Object} [query] — параметры запроса
	 */
	open (path, query) {
		let url = URL.request(...arguments);

		browser.url(url);
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

		Log.info(`Used ${login} account`);

		browser.url('/');
		browser.setCookies(cookie);
	}
}

module.exports = PageObject;
