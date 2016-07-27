'use strict';

let OauthPage = require('../../pages/oauth');

/** Модуль для работы с представлением сервиса vk.com */
class VkPage extends OauthPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '#container';

		return {
			container,
			login: `${container} [name="email"]`,
			password: `${container} [name="pass"]`,
			signIn: `${container} #install_allow`
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

module.exports = VkPage;
