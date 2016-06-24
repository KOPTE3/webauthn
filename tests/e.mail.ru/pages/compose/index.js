'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы написания письма */
class Compose extends PageObject {
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

		return this.page.waitForExist(this.locators.container);
	}

	/**
	 * Получить заголовок страницы написания письма
	 *
	 * @type {string}
	 */
	get title () {
		this.page.getTitle();
	}
}

module.exports = new Compose();
