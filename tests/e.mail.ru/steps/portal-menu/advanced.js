'use strict';

let assert = require('assert');

let PortalMenuSteps = require('../../steps/portal-menu');
let Advanced = require('../../pages/portal-menu/advanced');

/** Модуль для работы с представлением страницы поиска писем */
class AdvancedSteps extends PortalMenuSteps {
	constructor () {
		super();

		this.advanced = new Advanced();
	}

	/**
	 * Проверка видимости формы
	 */
	isVisible () {
		let actual = this.advanced.isVisible();

		assert(actual, 'Видимость расширенного поиска');
	}

	/**
	 * Кликнуть в текстовое поле
	 *
	 * @param {string} name - имя поля
	 */
	clickField (name) {
		this.advanced.clickField(name);

		this.isFocusInField(name);
	}

	/**
	 * Кликнуть в чекбокс
	 *
	 * @param {string} name - unread|flag|attach
	 */
	clickCheckbox (name) {
		let checked = this.advanced.isChecked(name);

		this.advanced.clickCheckbox(name);

		let actual = this.advanced.isChecked(name);

		assert(actual !== checked, `Чекбокс ${name} не кликнулся`);
	}

	/**
	 * Кликнуть в селект выбора разброса даты
	 */
	clickDateSelect () {
		this.advanced.clickDateSelect();
	}

	/**
	 * Кликнуть в поле даты
	 */
	clickDateField () {
		this.advanced.clickDateField();
	}

	/**
	 * Кликнуть в сегодняшний день в календаре
	 */
	clickCalendarToday () {
		this.advanced.clickCalendarToday();
	}

	/**
	 * Выбрать разброс даты
	 *
	 * @param {string} value - (0|1|3|7|30)
	 */
	selectDateLapse (value) {
		this.advanced.selectDateLapse(value);

		let actual = this.advanced.getSelectDateValue();

		assert(actual === value, `Не удалось установить разброс даты: ${value}`);
	}


	/**
	 * Курсор в заданном поле
	 *
	 * @param {string} name - имя поля
	 */
	isFocusInField (name) {
		let actual = this.advanced.isFocusInField(name);

		assert(actual, `Курсор не находится в поле ${name}`);
	}

	/**
	 * Выбран ли чекбокс
	 *
	 * @param {string} name - unread|flag|attach
	 * @param {boolean} reverse - наоборот, проверка что чекбокс не выбран
	 */
	isChecked (name, reverse) {
		let actual = this.advanced.isChecked(name);

		assert(actual === !reverse, `Чекбокс ${name}${reverse ? '' : ' не'} выбран`);
	}

	/**
	 * Проверка видимости календаря
	 *
	 * @param {boolean} reverse - невидимость
	 */
	isCalendarVisible (reverse = false) {
		let actual = this.advanced.isCalendarVisible(reverse);

		assert(actual, `Календарь${reverse ? '' : ' не'} виден`);
	}

	/**
	 * В календаре отображается сегодняшнее число
	 *
	 * @param {string} day - сегодняшнее число
	 */
	calendarHasToday (day) {
		let actual = this.advanced.getCalendarToday();

		assert(actual === day, `В календаре не отображается сегодняшнее число (${day})`);
	}

	/**
	 * Сравнить текст селекта
	 *
	 * @param {string} text - должен быть этот текст
	 */
	checkSelectDateText (text) {
		let actual = this.advanced.getSelectDateText();

		assert(actual === text, `Текст в селекте разброса даты не равен ${text}`);
	}

	/**
	 * Сравнить текст поля даты
	 *
	 * @param {string} text - должен быть этот текст
	 */
	checkDateFieldText (text) {
		let actual = this.advanced.getDateFieldText();

		assert(actual === text, `Текст в поле даты не равен ${text}`);
	}

	/**
	 * Показаны саджесты для поля
	 *
	 * @param {string} name - имя поля
	 */
	hasSuggests (name) {
		let actual = this.advanced.hasSuggests(name);

		assert(actual, `Для поля ${name} саджесты не показаны`);
	}

	/**
	 * Не показаны саджесты для поля
	 *
	 * @param {string} name - имя поля
	 */
	noSuggests (name) {
		let actual = this.advanced.hasSuggests(name, true);

		assert(actual, `Для поля ${name} саджесты показаны`);
	}
}

module.exports = new AdvancedSteps();
