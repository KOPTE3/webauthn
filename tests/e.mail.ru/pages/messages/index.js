'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы списка писем */
class MessagesPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/message';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-letters'
		};
	}
}

module.exports = MessagesPage;
