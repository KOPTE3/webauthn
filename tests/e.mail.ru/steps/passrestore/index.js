'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/passrestore');

/** Модуль для работы с шагами страницы восстановления пароля */
class PassRestore extends Steps {
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

		assert(actual, 'Не удалось открыть страницу восстановления');
	}

}

module.exports = new PassRestore();
