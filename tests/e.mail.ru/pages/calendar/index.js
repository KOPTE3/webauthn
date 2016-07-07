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

		/** eslint-disable max-len */
		return {
			container,
			today: `${container} .form__calendar__cell_today a`,
			lapse: {
				el: `${container} .form__calendar__cell_lapse`,
				selected: `${container} .form__calendar__cell_lapse .form__calendar__link_selected`,
				'1': `${container} .form__calendar__cell_lapse [data-lapse="1"]`,
				'3': `${container} .form__calendar__cell_lapse [data-lapse="3"]`,
				'7': `${container} .form__calendar__cell_lapse [data-lapse="7"]`,
				'30': `${container} .form__calendar__cell_lapse [data-lapse="30"]`
			}
		};

		/** eslint-enable */
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
	 * Проверка видимости выбора временного промежутка
	 *
	 * @param {boolean} reverse - невидимость
	 * @returns {boolean}
	 */
	isLapseVisible (reverse = false) {
		return this.page.isVisible(this.locators.lapse.el, void 0, reverse);
	}

	/**
	 * Есть ли выделенный пунтк в выборе временного промежутка
	 *
	 * @returns {boolean}
	 */
	hasSelectedLapse () {
		return this.page.isVisible(this.locators.lapse.selected);
	}

	/**
	 * Кликнуть на временной промежуток
	 * @param {string} value - (1|3|7|30)
	 */
	clickLapse (value) {
		this.page.click(this.locators.lapse[value]);
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

	/**
	 * Получить выбранное значение временного промежутка
	 *
	 * @returns {string}
	 */
	getLapse () {
		let value = '0';

		if (this.hasSelectedLapse()) {
			value = this.page.getAttribute(this.locators.lapse.selected, 'data-lapse');
		}

		return value;
	}
}

module.exports = Calendar;
