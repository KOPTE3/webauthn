'use strict';

let PageObject = require('../../pages');

/** @namespace browser */

class Login extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container: '.login-page__external'
		};
	}

	/**
	 * Авторизация
	 *
	 * @param {string}
	 * @returns {boolean}
	 */
	auth (type) {
		super.auth(type);

		return browser.execute(() => {
			return window.patron.username;
		});
	}

	/**
	 * Открыть страницу логина
	 *
	 * @returns {boolean}
	 */
	open () {
		super.open('/login');

		return browser.waitForExist(this.locators.container);
	}
}

module.exports = new Login();
