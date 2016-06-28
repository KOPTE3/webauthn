'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let LoginPage = require('../../pages/login');

/** Модуль для работы с шагами страницы логина */
class LoginStep extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу авторизации
	 *
	 * @static
	 * @param {Object} [query] — параметры запроса
	 */
	static open (query) {
		let login = new LoginPage();
		let actual = login.open(query);

		assert(actual, 'Не удалось открыть страницу');
	}
}

module.exports = LoginStep;
