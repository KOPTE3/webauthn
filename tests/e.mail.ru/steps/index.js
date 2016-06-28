'use strict';

let assert = require('assert');
let Pages = require('../pages');

class Steps extends Pages {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @param {string} name
	 */
	static addFeature (name) {
		let pages = new Pages();

		pages.addFeature(name);
	}

	/**
	 *
	 * Открыть страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	static open (query) {
		let actual = this.page.open(query);

		assert(actual, 'Не удалось открыть страницу');
	}
}

module.exports = Steps;
