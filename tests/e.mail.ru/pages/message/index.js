'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением письма */
class Message extends PageObject {
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
			container: '.b-letter'
		};
	}

	/**
	 * Открыть страницу чтения письма
	 *
	 * @param {string} path — id письма
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (path, query) {
		super.open(`/message/${path}`, query);

		return this.page.waitForExist(this.locators.container);
	}
}

module.exports = new Message();
