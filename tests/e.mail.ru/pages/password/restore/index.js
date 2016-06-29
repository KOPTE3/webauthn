'use strict';

let PasswordPage = require('../restore');

/** Модуль для работы с представлением страницы восстановления пароля */
class PasswordRestorePage extends PasswordPage {
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
