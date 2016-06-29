'use strict';

let PortalMenu = require('../portal-menu');
let Advanced = require('../portal-menu/advanced');

/** Модуль для работы с поиском в синей шапке */
class PortalSearch extends PortalMenu {
	constructor () {
		super();

		this.advanced = new Advanced();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.pm-toolbar__search__container';

		return this.extend(super.locators, {
			container,
			form: `${container} .js-search`,
			advancedToggle: `${container} .js-dropdown-button`
		});
	}

	/**
	 * Нажать на кнопку расширенного поиска
	 */
	toggleAdvanced () {
		this.page.click(this.locators.advancedToggle);
	}

	/**
	 * Скрыть расширенный поиск
	 *
	 * @return {boolean}
	 */
	hideAdvanced () {
		this.toggleAdvanced();

		return this.page.waitForVisible(this.advanced.locators.container, void 0, true);
	}

	/**
	 * Показать расширенный поиск
	 *
	 * @return {boolean}
	 */
	showAdvanced () {
		this.toggleAdvanced();

		return this.page.waitForVisible(this.advanced.locators.container);
	}
}

module.exports = PortalSearch;
