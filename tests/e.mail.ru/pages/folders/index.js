'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением списка папок */
class Folders extends PageObject {
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
			container: '.b-nav_folders'
		};
	}

	/**
	 * Дождаться появления списка папок
	 *
	 * @returns {boolean}
	 */
	wait () {
		return this.page.waitForExist(this.locators.container);
	}
}

module.exports = new Folders();
