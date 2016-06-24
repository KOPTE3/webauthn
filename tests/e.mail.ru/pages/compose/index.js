'use strict';

let PageObject = require('../../pages');

/** @namespace browser */
/** Модуль для работы с представлением страницы написания письма */
class Compose extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container: '.b-compose'
		};
	}

	/**
	 * Открыть страницу написания письма
	 *
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query) {
		super.open('/compose', query);

		return browser.waitForExist(this.locators.container);
	}

	/**
	 * Получить заголовок страницы написания письма
	 *
	 * @type {string}
	 */
	get title () {
		browser.getTitle();
	}
}

module.exports = new Login();
