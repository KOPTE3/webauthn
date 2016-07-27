'use strict';

let OAuthPage = require('../../pages/oauth');

/** Модуль для работы с представлением сервиса vk.com */
class VkPage extends OAuthPage {
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
}

module.exports = VkPage;
