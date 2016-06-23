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
	 * Открыть страницу логина
	 *
	 * @returns {boolean}
	 */
	open () {
		browser.url('/login');

		return browser.waitForExist(this.locators.container);
	}
}

module.exports = new Login();
