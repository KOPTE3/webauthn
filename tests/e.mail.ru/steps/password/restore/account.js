'use strict';

let assert = require('assert');

let PasswordRestoreSteps = require('../restore');
let AccountViewPage = require('../../../pages/passrestore/account');
let accountViewPage = new AccountViewPage();

/** Модуль для работы с формой ввода адреса для восстановления */
class Controls extends PasswordRestoreSteps {
	constructor () {
		super();
	}

	/**
	* @param {string} [email] - адрес для восстановления
	*/
	setEmail (email) {
		accountViewPage.setEmail(email);
	}

	/**
	 * Submit form with email to restore
	 */
	submitForm () {
		accountViewPage.submitForm();
	}
}

module.exports = Controls;
