'use strict';

let OauthPage = require('../../pages/oauth');

/** Модуль для работы с представлением сервиса fb.com */
class FbPage extends OauthPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.login_page';

		return {
			container,
			login: `${container} #email`,
			password: `${container} #pass`,
			signIn: `${container} #loginbutton`
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

module.exports = FbPage;
