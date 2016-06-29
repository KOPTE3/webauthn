'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let PasswordPage = require('../../pages/password');

class PasswordSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new PasswordPage();
	}
}

module.exports = PasswordSteps;
