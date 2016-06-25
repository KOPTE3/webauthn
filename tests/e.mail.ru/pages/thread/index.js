'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением треда */
class Thread extends PageObject {
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
			container: '.b-thread'
		};
	}

	/**
	 * Открыть страницу чтения треда
	 *
	 * @param {string} path — id треда
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (path, query) {
		super.open(`/thread/${path}`, query);

		return this.page.waitForExist(this.locators.container);
	}
}

module.exports = new Thread();
