'use strict';

let PassrestoreSelectPage = require('../passrestore/select');

/** Модуль для работы со страницей на восстановлении доступа (mrim) */
class AccessViewPage extends PassrestoreSelectPage {
	constructor () {
		super();
	}


	/**
	 * Открытие страницы
	 * @param {string} email
	 * @returns {boolean}
	 */
	open (email) {
		return super.open({
			email,
			type: 'mrim'
		});
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let selectViewLocators = super.locators;

		selectViewLocators.container = '.js-view-access-type';

		return selectViewLocators;
	}
}

module.exports = AccessViewPage;
