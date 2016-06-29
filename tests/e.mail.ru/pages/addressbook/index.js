'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы адресной книги */
class AddressBookPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/addressbook';
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
}

module.exports = AddressBookPage;
