'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с редактором страницы написания письма */
class Editor extends PageObject {
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
			container: '.mceToolbarRow1'
		};
	}

	/**
	 * Дождаться открытия страницы написания письма
	 *
	 * @return {boolean}
	 */
	wait () {
		return this.page.waitForExist(this.locators.container);
	}
}

module.exports = new Editor();
