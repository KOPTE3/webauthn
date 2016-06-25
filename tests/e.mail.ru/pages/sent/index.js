'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы отправленного письма */
class Sent extends PageObject {
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
			container: '.b-compose__sent'
		};
	}

	/**
	 * Открыть страницу адресной книги
	 *
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query) {
		super.open('/sendmsgok', query);

		return this.page.waitForExist(this.locators.container);
	}
}

module.exports = new Sent();
