'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы списка писем */
class Messages extends PageObject {
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
			container: '.b-datalist_letters'
		};
	}

	/**
	 * Открыть страницу написания письма
	 *
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query) {
		super.open('/messages', query);

		return this.page.waitForExist(this.locators.container);
	}
}

module.exports = new Messages();
