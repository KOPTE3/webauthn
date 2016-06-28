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
	 * Авторизация
	 *
	 * @param {string} type
	 * @returns {boolean}
	 */
	auth (type) {
		super.auth(type);

		return this.page.execute(() => {
			return window.patron.username;
		});
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
