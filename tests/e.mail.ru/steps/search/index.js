'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let SearchPage = require('../../pages/search');

/** Модуль для работы с шагами страницы поиска */
class SearchSteps extends Steps {
	constructor () {
		super();

		this.searchPage = new SearchPage();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new SearchPage();
	}

	/**
	 *
	 */
	waitForUrl () {
		let actual = this.searchPage.waitForUrl();

		assert(actual, `Не найдено соответствие с ожидаемым адресом  ${this.searchPage.location}`);
	}
}

module.exports = SearchSteps;
