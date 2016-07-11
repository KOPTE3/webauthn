'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы настроек */
class Settings extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/search';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.settings__index__widgets'
		};
	}
}

module.exports = Settings;
