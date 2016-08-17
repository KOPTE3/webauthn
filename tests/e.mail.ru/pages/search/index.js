'use strict';

let MessagesPage = require('../../pages/messages');

/** Модуль для работы с представлением страницы поиска писем */
class SearchPage extends MessagesPage {
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

	get lettersLocator () {
		return '.b-datalist_search';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = this.lettersLocator;

		return this.extend(super.locators, {
			container,
			letters: `${container} .b-datalist__item`
		});
	}
}

module.exports = SearchPage;
