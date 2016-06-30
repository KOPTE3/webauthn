'use strict';

let PortalMenuSteps = require('../../steps/portal-menu');
let Advanced = require('../../pages/portal-menu/advanced');

let assert = require('assert');

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
		let visible = this.advanced.isVisible();

		assert(visible, 'Видимость расширенного поиска');
	}

	/**
	 * Кликнуть в чекбокс
	 *
	 * @param {string} name - unread|flag|attach
	 */
	clickCheckbox (name) {
		let checked = this.advanced.isChecked(name);

		this.advanced.clickCheckbox(name);

		assert(checked !== this.advanced.isChecked(name), 'чекбокс не кликнулся');
	}

	/**
	 * Выбран ли чекбокс
	 *
	 * @param {string} name - unread|flag|attach
	 * @param {boolean} reverse - наоборот, проверка что чекбокс не выбран
	 */
	isChecked (name, reverse) {
		let checked = this.advanced.isChecked(name);

		assert(checked === !reverse, `Чекбокс ${name}${reverse ? '' : ' не'} выбран`);
	}
}

module.exports = new AdvancedSteps();
