'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы адресной книги */
class PasswordRestorePage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/password/restore';
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

module.exports = PasswordRestorePage;
