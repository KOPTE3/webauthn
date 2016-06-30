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
	 * Открыть страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	static open (query) {
		try {
			if (!this.page.locators.container) {
				throw new Error();
			}
		} catch (error) {
			assert(false, 'Не определен основной элемент страницы в ' +
				'"locators.container"');
		}

		let actual = this.page.open(query);

		assert(actual, 'Не удалось авторизоваться');
	}
}

module.exports = Steps;
