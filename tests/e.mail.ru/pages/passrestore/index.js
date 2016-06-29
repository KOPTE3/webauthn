'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы восстановления пароля */
class Settings extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			accountView: '.js-view-account'
		};
	}

	/**
	 * Открыть страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query) {
		super.open('/password/restore', query);

		return this.page.waitForExist(this.locators.accountView);
	}
}

module.exports = new Settings();
