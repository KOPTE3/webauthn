'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/messages');

/** Модуль для работы с шагами страницы списка писем */
class Messages extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу написания письма
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	open (query) {
		let actual = page.open(query);

		assert(actual, 'Не удалось открыть страницу списка писем');
	}
}

module.exports = new Messages();
