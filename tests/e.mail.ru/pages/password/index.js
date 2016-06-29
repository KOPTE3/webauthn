'use strict';

let PageObject = require('../../pages');

class PasswordPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/password';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.password-recovery__remind__new'
		};
	}
}

module.exports = PasswordPage;
