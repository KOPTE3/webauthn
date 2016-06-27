'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/search');

/** Модуль для работы с шагами страницы поиска */
class Search extends Steps {
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

		assert(actual, 'Не удалось открыть страницу поиска');
	}
}

module.exports = new Search();