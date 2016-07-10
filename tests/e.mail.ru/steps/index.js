'use strict';

let assert = require('assert');
let Pages = require('../pages');

let pages = new Pages();

class Steps extends Pages {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @param {Array} list — список фич, которые требуется включить
	 */
	static features (...list) {
		pages.features(...list);
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

	/**
	 * Дожидается требуемного адреса
	 *
	 * @param {string|RegExp} url
	 * @param {string} [query]
	 */
	waitForUrl (url, query) {
		let actual = pages.waitForUrl(...arguments);

		assert(actual, `Не найдено соответствие с ожидаемым адресом ${url}`);
	}
}

module.exports = Steps;
