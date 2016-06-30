'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы логина */
class LoginPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/login';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-login'
		};
	}
}

module.exports = LoginPage;
