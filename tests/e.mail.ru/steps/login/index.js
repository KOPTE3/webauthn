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
		login.open();
	}

	/**
	 * Авторизация
	 */
	auth () {
		let {value} = login.auth();

		console.log(value)

		assert(value, `Не удалось авторизоваться ${value}`);
	}
}

module.exports = new Login();
