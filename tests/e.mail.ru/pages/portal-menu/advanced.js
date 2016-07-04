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
			form: `${container} form`,
			checkboxes: {
				unread: `${container} [name="q_read"]`,
				flag: `${container} [name="q_flag"]`,
				attach: `${container} [name="q_attach"]`
			}
		});
	}

	/**
	 * Видимость формы
	 *
	 * @returns {boolean}
	 */
	isVisible () {
		return this.page.isVisible(this.locators.form);
	}

	/**
	 * Выбран ли чекбокс
	 *
	 * @param {string} name - unread|flag|attach
	 * @returns {boolean}
	 */
	isChecked (name) {
		let checkbox = this.page.element(this.locators.checkboxes[name]);

		return !!checkbox.getAttribute('checked');
	}

	/**
	 * Кликнуть в чекбокс
	 *
	 * @param {string} name - unread|flag|attach
	 */
	clickCheckbox (name) {
		this.page.click(this.locators.checkboxes[name]);
	}
}

module.exports = Advanced;
