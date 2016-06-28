'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let SearchPage = require('../../pages/search');

let searchPage = new SearchPage();

/** Модуль для работы с шагами страницы поиска */
class Search extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу
	 *
	 * @static
	 * @param {Object} [query] — параметры запроса
	 */
	static open (query) {
		let actual = searchPage.open(query);

		assert(actual, 'Не удалось открыть страницу поиска');
	}

	/**
	 * Авторизация
	 *
	 * @static
	 */
	static auth () {
		searchPage.auth();
	}
}

module.exports = Search;
