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
	 * Проверка видимости блока выбора временного промежутка
	 *
	 * @param {boolean} reverse - невидимость
	 */
	isLapseVisible (reverse = false) {
		let actual = this.calendar.isLapseVisible(reverse);

		assert(actual, `Выбор временного промежутка${reverse ? '' : ' не'} виден`);
	}

	/**
	 * Кликнуть в сегодняшний день в календаре
	 */
	clickToday () {
		this.calendar.clickToday();
	}

	/**
	 * Кликнуть на временной промежуток
	 * Чтобы выбрать нулевой промежуток, нужно кликнуть на уже выбранный
	 * @see clickSelectedLapse
	 *
	 * @param {string} value - (1|3|7|30)
	 */
	clickLapse (value) {
		this.calendar.clickLapse(value);
	}

	/**
	 * Кликнуть на уже выбранный промежуток,
	 * чтобы снять выделение.
	 */
	clickSelectedLapse () {
		let selected = this.calendar.getLapse();

		if (selected !== '0') {
			this.clickLapse(selected);
		}
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

	/**
	 * Проверить выбранный временной промежуток
	 *
	 * @param {string} value - промежуток (0|1|3|7|30)
	 */
	checkLapse (value) {
		let actual = this.calendar.getLapse();

		assert(actual === value, `В календаре не выбран временной промежуток ${value}`);
	}
}

module.exports = CalendarSteps;
