'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с портальным меню (синей шапкой) */
class PortalMenu extends PageObject {
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
			container: '.portal-menu'
		};
	}
}

module.exports = PortalMenu;
