'use strict';

let PageObject = require('../../../pages');

class SettingsMessagesPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/settings/messages';
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '#formMail'
		};
	}

}

module.exports = SettingsMessagesPage;
