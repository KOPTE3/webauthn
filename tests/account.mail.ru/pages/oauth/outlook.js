'use strict';

let OauthPage = require('../../pages/oauth');

/** Модуль для работы с представлением сервиса outlook.com */
class OutlookPage extends OauthPage {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return 'https://login.live.com/oauth20_authorize.srf';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '#maincontent';

		return {
			container,
			password: `${container} [name="passwd"]`,
			signIn: `${container} .btn-block[type="submit"]`
		};
	}

	/**
	 * Клик по кнопке авторизации
	 *
	 * @returns {*}
	 */
	clickSignInBtn () {
		return this.page.click(this.locators.signIn);
	}

	/**
	 * Заполнить поле пароля
	 *
	 * @param {string} password
	 */
	setPassword (password) {
		this.page.setValue(this.locators.password, password);
	}

	/**
	 * Ожиданеие пока элемент пароля будет виден
	 */
	waitPassowrd () {
		this.page.waitForVisible(this.locators.password);
	}

}

module.exports = OutlookPage;
