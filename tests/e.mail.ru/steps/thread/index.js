'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/thread');

/** Модуль для работы с шагами страницы треда */
class Thread extends Steps {
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

		assert(actual, 'Не удалось открыть страницу треда');
	}
}

module.exports = new Thread();
