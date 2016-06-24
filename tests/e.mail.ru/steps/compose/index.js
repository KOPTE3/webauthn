'use strict';

let Steps = require('../../steps');
let page = require('../../pages/compose');

/** Модуль для работы с шагами страницы написания письма */
class Compose extends Steps {
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

		assert(actual, 'Не удалось открыть страницу написания письма');
	}
}

module.exports = new Compose();
