'use strict';

let assert = require('assert');

let PortalMenuSteps = require('../../steps/portal-menu');
let Advanced = require('../../pages/portal-menu/advanced');
let Search = require('../../pages/search');

const constants = require('../../utils/constants');

/** Модуль для работы с представлением страницы поиска писем */
class AdvancedSteps extends PortalMenuSteps {
	constructor () {
		super();

		this.advanced = new Advanced();
		this.search = new Search();
	}

	/**
	 * Проверка видимости расширенного поиска
	 */
	isVisible () {
		let actual = this.advanced.isVisible();

		assert(actual, 'Видимость расширенного поиска');
	}

	/**
	 * Проверка невидимости расширенного поиска
	 */
	isHidden () {
		let actual = this.advanced.isVisible();

		assert(!actual, 'Расширенный поиск остался виден');
	}

	/**
	 * Кликнуть на 'Найти'
	 */
	clickSubmit () {
		this.advanced.clickSubmit();

		let actual = this.search.wait();

		assert(actual, 'Не удалось дождаться открытия страницы поиска');
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
	 * Выбрать разброс даты
	 *
	 * @param {string} value - (0|1|3|7|30)
	 */
	selectDateLapse (value) {
		this.advanced.selectDateLapse(value);

		let actual = this.advanced.getSelectDateValue();

		assert.equal(actual, value, `Не удалось установить разброс даты: ${value}`);
	}

	/**
	 * Ввести текст в поле
	 *
	 * @param {string} name - имя поля
	 * (from|to|subject|message)
	 * @param {string} text - содержимое
	 */
	setFieldText (name, text) {
		this.advanced.setFieldText(name, text);
	}

	/**
	 * Проверить текст в поле
	 *
	 * @param {string} name - имя поля
	 * (from|to|subject|message)
	 * @param {string} text - содержимое
	 */
	checkFieldText (name, text) {
		let actual = this.advanced.getFieldText(name);

		assert.equal(actual, text, `Текст поля ${name} не равен ${text}`);
	}

	/**
	 * Нажать на клавиши в поле
	 *
	 * @param {string} name - имя поля
	 * @param {string|string[]} keys - что печатать
	 */
	setFieldKeys (name, keys) {
		this.advanced.setFieldKeys(name, keys);
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

		assert.equal(actual, !reverse, `Чекбокс ${name}${reverse ? '' : ' не'} выбран`);
	}

	/**
	 * Сравнить текст селекта
	 *
	 * @param {string} text - должен быть этот текст
	 */
	checkSelectDateText (text) {
		let actual = this.advanced.getSelectDateText();

		assert.equal(actual, text, `Текст в селекте разброса даты не равен ${text}`);
	}

	/**
	 * Сравнить текст поля даты
	 *
	 * @param {string} text - должен быть этот текст
	 */
	checkDateFieldText (text) {
		let actual = this.advanced.getDateFieldText();

		assert.equal(actual, text, `Текст в поле даты не равен ${text}`);
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

	/**
	 * Выбрать стрелкой вниз саджест с заданным текстом
	 * У саджестов емейлов текст состоит из двух строчек с \n
	 *
	 * @param {string} name - имя поля
	 * @param {string} suggest - текст саджеста
	 */
	selectSuggestByKeys (name, suggest) {
		const downKey = constants.UNICODE_CHARACTERS.Down;
		let counter = 0;
		let actual = false;
		let currentText;

		while (counter++ < 10) {
			currentText = this.advanced.getSelectedSuggestText(name);

			if (currentText === suggest) {
				actual = true;
				break;
			}

			this.advanced.setFieldKeys(name, downKey);
		}

		assert(actual, `Не удалось выбрать пункт ${suggest} в саджестах`);
	}
}

module.exports = AdvancedSteps;
