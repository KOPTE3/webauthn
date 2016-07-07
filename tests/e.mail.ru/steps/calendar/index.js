'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let Calendar = require('../../pages/calendar');

/** Шаги для работы с календарем */
class CalendarSteps extends Steps {
	constructor (parentLocator) {
		super();

		this.calendar = new Calendar(parentLocator);
	}

	/**
	 * Проверка видимости календаря
	 *
	 * @param {boolean} reverse - невидимость
	 */
	isVisible (reverse = false) {
		let actual = this.calendar.isVisible(reverse);

		assert(actual, `Календарь${reverse ? '' : ' не'} виден`);
	}

	/**
	 * Кликнуть в сегодняшний день в календаре
	 */
	clickToday () {
		this.calendar.clickToday();
	}

	/**
	 * В календаре отображается сегодняшнее число
	 *
	 * @param {string} day - сегодняшнее число
	 */
	hasToday (day) {
		let actual = this.calendar.getToday();

		assert(actual === day, `В календаре не отображается сегодняшнее число (${day})`);
	}
}

module.exports = CalendarSteps;
