'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы логина */
class LoginPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.login-page__external'
		};
	}

	/**
	 * Открыть страницу логина
	 *
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query) {
		super.open('/login', query);

		return this.page.waitForExist(this.locators.container);
	}
}

module.exports = LoginPage;
