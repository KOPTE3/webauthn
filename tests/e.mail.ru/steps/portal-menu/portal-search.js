'use strict';

let assert = require('assert');

let PortalMenuSteps = require('../../steps/portal-menu');

let PortalSearch = require('../../pages/portal-menu/portal-search');
let Advanced = require('../../pages/portal-menu/advanced');

let PortalSearchStore = require('../../store/portal-menu/portal-search');


/** Модуль для работы с представлением страницы поиска писем */
class PortalSearchSteps extends PortalMenuSteps {
	constructor () {
		super();

		this.portalSearch = new PortalSearch();
		this.advanced = new Advanced();
	}

	/**
	 * Нажать на кнопку расширенного поиска
	 *
	 * @see this.portalSearch.toggleAdvanced
	 */
	toggleAdvanced () {
		let visible = this.advanced.isVisible();
		let actual = visible ?
			this.portalSearch.hideAdvanced() :
			this.portalSearch.showAdvanced();

		assert(actual, 'Расширенный поиск не переключился');
	}

	/**
	 * Проверка наличия операнда
	 *
	 * @param {string} name - имя операнда
	 */
	hasOperand (name) {
		let actual = this.portalSearch.hasOperand(name);

		assert(actual, `Операнд ${name} не появился`);
	}

	/**
	 * Проверить, что у операнда есть иконка
	 *
	 * @param {string} name - имя операнда (unread|flag|attach)
	 */
	operandHasIcon (name) {
		let actual = this.portalSearch.operandHasIcon(name);

		assert(actual, `У операнда ${name} нет иконки`);
	}

	/**
	 * Проверить, что у операнда есть крестик
	 *
	 * @param {string} name - имя операнда
	 */
	operandHasClose (name) {
		let actual = this.portalSearch.operandHasClose(name);

		assert(actual, `У операнда ${name} нет кнопки закрыть`);
	}

	/**
	 * Проверить текст операнда
	 *
	 * @param {string} name - имя операнда
	 * @param {string} text - текст
	 */
	operandHasText (name, text) {
		let actual = this.portalSearch.getOperandText(name);

		assert(actual === text, `Текст операнда ${name} не равен "${text}"`);
	}

	/**
	 * Кликнуть в операнд
	 *
	 * @param {string} name - имя операнда
	 */
	clickOperand (name) {
		this.portalSearch.clickOperand(name);

		let actual = this.portalSearch.isOperandActive(name);

		if (PortalSearchStore.flagOperands.indexOf(name) > -1) {
			// Операнд-флаг не должен кликаться,
			assert(!actual, `По клику операнд ${name} активен`);
		} else {
			// а обычный операнд должен кликаться
			assert(actual, `По клику операнд ${name} не активен`);
		}
	}

	/**
	 * Фокус находится в операнде
	 *
	 * @param {string} name - имя операнда
	 */
	operandHasFocus (name) {
		let actual = this.portalSearch.operandHasFocus(name);

		assert(actual, `Фокус не находится в операнде ${name}`);
	}

	/**
	 * Фокус находится в пустом операнде
	 */
	isFocusInBlank () {
		this.operandHasFocus('blank');
	}
}

module.exports = new PortalSearchSteps();
