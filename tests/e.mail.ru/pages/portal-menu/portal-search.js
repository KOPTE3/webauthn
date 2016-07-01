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
			advancedToggle: `${container} .js-dropdown-button`,
			operands: {
				message: `${container} [data-operand-name="q_query"]`,
				from:	 `${container} [data-operand-name="q_from"]`,
				to:		 `${container} [data-operand-name="q_to"]`,
				subject: `${container} [data-operand-name="q_subj"]`,
				unread:	 `${container} [data-operand-name="q_read"]`,
				flag:	 `${container} [data-operand-name="q_flag"]`,
				attach:	 `${container} [data-operand-name="q_attach"]`,
				date:	 `${container} [data-operand-name="q_date"]`,
				blank:	 `${container} [data-operand-name="blank"]`,
				icons: {
					unread:	 `.ico_folder_unread`,
					flag:	 `.ico_folder_important`,
					attach:	 `.ico_folder_attachment`
				},
				close: '.b-operand__close',
				input: '.b-operand__input',
				active: '.b-operand_active'
			}
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

		return !!this.page.waitForVisible(this.advanced.locators.container);
	}

	/**
	 * Получить операнд по имени
	 *
	 * @param {string} name - имя операнда
	 * (message|from|to|subject|unread|flag|attach|date|blank)
	 * @return {*}
	 */
	getOperand (name) {
		return this.page.element(this.locators.operands[name]);
	}

	/**
	 * Получить текстовый инпут операнда
	 *
	 * @param {string} name - имя операнда
	 * @return {*}
	 */
	getOperandInput (name) {
		let operand = this.getOperand(name);
		let locator = this.locators.operands.input;

		return this.page.elementIdElement(operand.value.ELEMENT, locator);
	}

	/**
	 * Получить текст операнда.
	 *
	 * @param {string} name - имя операнда
	 * @return {string}
	 */
	getOperandText (name) {
		let input = this.getOperandInput(name);

		return input && input.state === 'success' ? input.getValue() : '';
	}

	/**
	 * Операнд существует
	 *
	 * @param {string} name - имя операнда
	 * @return {boolean}
	 */
	hasOperand (name) {
		return !!this.page.waitForVisible(this.locators.operands[name]);
	}

	/**
	 * У операнда есть иконка
	 *
	 * @param {string} name - имя операнда (unread|flag|attach)
	 * @return {boolean}
	 */
	operandHasIcon (name) {
		let operand = this.getOperand(name);
		let locator = this.locators.operands.icons[name];

		return !!this.page.elementIdElement(operand.value.ELEMENT, locator);
	}

	/**
	 * У операнда есть крестик
	 *
	 * @param {string} name - имя операнда (unread|flag|attach)
	 * @return {boolean}
	 */
	operandHasClose (name) {
		let operand = this.getOperand(name);

		return !!this.page.elementIdElement(operand.value.ELEMENT,
			this.locators.operands.close);
	}

	/**
	 * Операнд в режиме редактирования
	 *
	 * @param {string} name - имя операнда
	 * @return {boolean}
	 */
	isOperandActive (name) {
		let operand = this.getOperand(name);
		let classes = operand.getAttribute('class').split(' ');

		return classes.indexOf(this.locators.operands.active) > -1;
	}

	/**
	 * Фокус в инпуте операнда
	 * @param {string} name - имя операнда
	 * @return {boolean}
	 */
	operandHasFocus (name) {
		let locator = this.locators.operands[name] + ' ' + this.locators.operands.input;

		return this.page.hasFocus(locator);
	}

	/**
	 * Кликнуть в операнд
	 *
	 * @param {string} name - имя операнда
	 */
	clickOperand (name) {
		this.page.click(this.locators.operands[name]);
	}
}

module.exports = PortalSearch;
