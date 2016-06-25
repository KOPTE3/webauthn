'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/addressbook');

/** Модуль для работы с шагами страницы адресной книги */
class AddressBook extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	open (query) {
		let actual = page.open(query);

		assert(actual, 'Не удалось открыть страницу адресной книги');
	}
}

module.exports = new AddressBook();
