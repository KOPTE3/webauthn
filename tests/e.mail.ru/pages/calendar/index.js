'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с календарем */
class Calendar extends PageObject {
	constructor (parentLocator) {
		super();

		this.parentLocator = parentLocator;
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let parent = this.parentLocator || 'body';
		let container = `${parent} .form__calendar`;

		return {
			container,
			today: `${container} .form__calendar__cell_today a`
		};
	}

	/**
	 * Проверка видимости календаря
	 *
	 * @param {boolean} reverse - невидимость
	 * @returns {boolean}
	 */
	isVisible (reverse = false) {
		return this.page.waitForVisible(this.locators.container, void 0, reverse);
	}

	/**
	 * Кликнуть в сегодняшний день
	 */
	clickToday () {
		this.page.click(this.locators.today);
	}

	/**
	 * Получить значение сегодняшнего числа в календаре, если оно есть
	 *
	 * @returns {string}
	 */
	getToday () {
		return this.page.getText(this.locators.today);
	}
}

module.exports = Calendar;
