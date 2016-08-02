'use strict';

let OAuthPage = require('../../pages/oauth');

/** Модуль для работы с представлением сервиса outlook.com */
class OutlookPage extends OAuthPage {
	constructor () {
		super();
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
}

module.exports = OutlookPage;
