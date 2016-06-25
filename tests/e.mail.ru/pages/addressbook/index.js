'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы адресной книги */
class AddressBook extends PageObject {
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
			container: '.addressbook_page_view'
		};
	}

	/**
	 * Открыть страницу адресной книги
	 *
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query) {
		super.open('/addressbook', query);

		return this.page.waitForExist(this.locators.container);
	}
}

module.exports = new AddressBook();
