'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let AddressBookPage = require('../../pages/addressbook');

/** Модуль для работы с шагами страницы адресной книги */
class AddressBookSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new AddressBookPage();
	}
}

module.exports = AddressBookSteps;
