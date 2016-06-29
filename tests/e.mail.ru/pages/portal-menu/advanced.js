'use strict';

let PortalMenu = require('../portal-menu');

/** Модуль для работы с расширенным поиском */
class Advanced extends PortalMenu {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '#popup_advanced-search';

		return this.extend(super.locators, {
			container,
			form: `${container} form`
		});
	}

	/**
	 * Видимость формы
	 *
	 * @return {boolean}
	 */
	isVisible () {
		return this.page.isVisible(this.locators.form);
	}
}

module.exports = Advanced;
