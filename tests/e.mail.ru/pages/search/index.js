'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы поиска писем */
class SearchPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/search';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-datalist_search'
		};
	}
}

module.exports = SearchPage;
