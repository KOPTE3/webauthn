'use strict';

let PageObject = require('../../pages');

/** @namespace browser */

class Login extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container: '.b-compose'
		};
	}

	/** Открыть страницу написания письма
	 *
	 * @returns {boolean}
	 */
	open () {
		browser.url('/compose');

		return browser.waitForExist(this.locators.container);
	}

	/**
	 * Получить заголовок страницы написания письма
	 *
	 * @type {string}
	 */
	get title () {
		browser.getTitle();
	}
}

module.exports = new Login();
