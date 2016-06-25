'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы поиска писем */
class Search extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-fileSearch'
		};
	}

	/**
	 * Открыть страницу поиска писем
	 *
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query) {
		super.open('/search', query);

		return this.page.waitForExist(this.locators.container);
	}
}

module.exports = new Search();
