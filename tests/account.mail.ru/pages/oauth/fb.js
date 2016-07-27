'use strict';

let OAuthPage = require('../../pages/oauth');

/** Модуль для работы с представлением сервиса fb.com */
class FbPage extends OAuthPage {
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
}

module.exports = FbPage;
