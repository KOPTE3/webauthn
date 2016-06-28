'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let ComposePage = require('../../pages/compose');

let composePage = new ComposePage();

/** Модуль для работы с шагами страницы написания письма */
class ComposeSteps extends Steps {
	constructor () {
		super();

		this.composePage = composePage;
	}

	/**
	 * Открыть страницу написания письма
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	static open (query) {
		let actual = composePage.open(query);

		assert(actual, 'Не удалось открыть страницу написания письма');
	}
}

module.exports = ComposeSteps;
