'use strict';

let PassrestorePage = require('../passrestore');

/** Модуль для работы с формой ввода адреса */
class AccountPage extends PassrestorePage {
	constructor () {
		super();
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.js-view-account',
			form: '.js-form-account',
			email: '.js-input-login',
			domain: '.js-input-domain'
		};
	}

	/**
	 * Установить адрес для восстановления пароля
	 *
	 * @param {string} [email]
	 */
	setEmail (email) {
		this.page.setValue(this.locators.email, email);
	}

	/**
	 * Попытка восстановить пароль
	 */
	submitForm () {
		this.page.submitForm(this.locators.form);
	}
}

module.exports = AccountPage;
