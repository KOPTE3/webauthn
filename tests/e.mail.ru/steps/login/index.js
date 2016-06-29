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
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new LoginPage();
	}
}

module.exports = LoginStep;
