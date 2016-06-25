'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/message');

/** Модуль для работы с шагами страницы чтения письма */
class Message extends Steps {
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

		assert(actual, 'Не удалось открыть страницу чтения письма');
	}
}

module.exports = new Message();
