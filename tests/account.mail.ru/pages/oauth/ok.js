'use strict';

let OauthPage = require('../../pages/oauth');

/** Модуль для работы с представлением сервиса ok.com */
class OkPage extends OauthPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '#hook_Block_OAuth2Login';

		return {
			container,
			login: `${container} #field_email`,
			password: `${container} #field_password`,
			signIn: `${container} .button-pro[value="Sign in"]`
		};
	}

	/**
	 * Клик по кнопке "Войти"
	 *
	 * @returns {*}
	 */
	clickSignInBtn () {
		return this.page.click(this.locators.signIn);
	}
}

module.exports = OkPage;
