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
	 * @param {Array} list — список фич, которые требуется включить
	 */
	static features (...list) {
		let pages = new Pages();

		pages.features(...list);
	}

	/**
	 * Обновить страницу
	 */
	static refresh () {
		this.page.refresh();
	}

	/**
	 * Дождатся загрузки страницы
	 */
	static wait () {
		this.page.wait();
	}

	/**
	 * Аппрувнуть конфирм
	 */
	static alertAccept () {
		this.page.alertAccept();
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
