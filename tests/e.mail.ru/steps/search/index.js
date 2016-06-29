'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let SearchPage = require('../../pages/search');

/** Модуль для работы с шагами страницы поиска */
class SearchSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new SearchPage();
	}
}

module.exports = SearchSteps;
