'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let login = require('../../pages/login');

class Login extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу написания авторизацию
	 */
	open () {
		let actual = login.open();

		assert(actual.value, 'Не удалось открыть страницу');
	}
}

module.exports = new Login();
