'use strict';

let assert = require('assert');
let Pages = require('../pages');

class Steps {
	/**
	 * Локаторы
	 *
	 * @param {Array} list — список фич, которые требуется включить
	 */
	static features (...list) {
		let pages = new Pages();

		pages.features(...list);
	}

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
