'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/settings');

/** Модуль для работы с шагами страницы настроек */
class Settings extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	open (query) {
		let actual = page.open(query);

		assert(actual, 'Не удалось открыть страницу настроек');
	}
}

module.exports = new Settings();
