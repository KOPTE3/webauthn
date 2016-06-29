'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let accountView = require('../../pages/passrestore/account');

/** Модуль для работы с формой ввода адреса для восстановления */
class Controls extends Steps {
	constructor () {
		super();
	}

	/**
	* @param {string} [email] - адрес для восстановления
	*/
	setEmail (email) {
		accountView.setEmail(email);
	}

	/**
	 * Submit form with email to restore
	 */
	submitForm () {
		accountView.submitForm();
	}
}

module.exports = new Controls();
