'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением письма */
class MessagePage extends PageObject {
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
			container: '#b-letter',
			fastreply: '.b-letter_expanded [data-name="fast-reply"]'
		};
	}

}

module.exports = MessagePage;
