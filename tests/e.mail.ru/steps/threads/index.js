'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/threads');

/** Модуль для работы с шагами страницы списка тредов */
class Threads extends Steps {
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

		assert(actual, 'Не удалось открыть страницу списка тредов');
	}
}

module.exports = new Threads();
