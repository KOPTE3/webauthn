'use strict';

let assert = require('assert');

let PasswordRestoreSteps = require('../restore');
let AccountPage = require('../../../pages/passrestore/account');

/** Модуль для работы с формой ввода адреса для восстановления */
class AccountSteps extends PasswordRestoreSteps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	get page () {
		return new AccountPage();
	}

	/**
	 * @param {string} [email] - адрес для восстановления
	 */
	setEmail (email) {
		this.page.setEmail(email);
	}

	/**
	 * Submit form with email to restore
	 */
	submitForm () {
		this.page.submitForm();
	}
}

module.exports = AccountSteps;
