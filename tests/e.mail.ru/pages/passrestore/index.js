'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы восстановления пароля */
class PassrestorePage extends PageObject {
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
			container: '.js-view-account'
		};
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/password/restore';
	}
}

module.exports = PassrestorePage;
