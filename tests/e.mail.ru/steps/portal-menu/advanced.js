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
