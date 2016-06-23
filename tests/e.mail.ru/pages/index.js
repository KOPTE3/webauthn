'use strict';

let Log = require('tir');
let Store = require('../store');

class PageObject {
	constructor () {
		this.store = new Store();
	}

	open (path) {
		browser.url(path);
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
