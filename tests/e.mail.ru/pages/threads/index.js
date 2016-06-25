'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением списка тредов */
class Threads extends PageObject {
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
			container: '.b-threads'
		};
	}

	/**
	 * Открыть страницу чтения треда
	 *
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query) {
		super.open('/threads', query);

		return this.page.waitForExist(this.locators.container);
	}
}

module.exports = new Threads();
