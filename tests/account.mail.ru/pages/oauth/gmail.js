'use strict';

let OAuthPage = require('../../pages/oauth');

/** Модуль для работы с представлением сервиса gmail.com */
class GmailPage extends OAuthPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.card.signin-card';

		return {
			container,
			nextBtn: `${container} .rc-button.rc-button-submit`,
			password: `${container} #Passwd[name=Passwd]`,
			signIn: `${container} #signIn`
		};
	}
}

module.exports = GmailPage;
