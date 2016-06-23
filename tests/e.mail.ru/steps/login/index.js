'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let login = require('../../pages/login');

class Login extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу авторизации
	 */
	open () {
		let actual = login.open();

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
