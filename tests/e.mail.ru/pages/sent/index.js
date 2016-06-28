'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы отправленного письма */
class Sent extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/sendmsgok';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-compose__sent'
		};
	}
}

module.exports = new Sent();
