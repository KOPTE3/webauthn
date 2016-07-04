'use strict';

let assert = require('assert');
let Pages = require('../pages');

class Steps {
	/**
	 * Локаторы
	 *
	 * @param {string} name
	 */
	static addFeature (name) {
		Pages.addFeature(name);
	}

	/**
	 * Авторизация
	 *
	 * @param {string} type — типа авторизации
	 * @returns {boolean}
	 */
	static auth (type) {
		return Pages.auth(type);
	}

	static openPage () {
		let actual = this.page.open();

		assert(actual, 'Не удалось открыть страницу');
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
