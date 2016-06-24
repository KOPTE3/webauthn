'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let login = require('../../pages/login');

/** Модуль для работы с шагами страницы логина */
class Login extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу авторизации
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	open (query) {
		let actual = login.open(query);

		assert(actual, 'Не удалось открыть страницу');
	}

	/**
	 * Авторизация
	 */
	auth () {
		login.auth();
	}
}

module.exports = new Login();
