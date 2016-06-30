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
					unread:	 `${container} [data-operand-name="q_read"] .ico_folder_unread`,
					flag:	 `${container} [data-operand-name="q_flag"] .ico_folder_important`,
					attach:	 `${container} [data-operand-name="q_attach"] .ico_folder_attachment`
				},
				close: '.b-operand__close'
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
		return this.page.element(this.locators.operands.icons[name]);
	}

	/**
	 * У операнда есть крестик
	 *
	 * @param {string} name - имя операнда (unread|flag|attach)
	 * @return {boolean}
	 */
	operandHasClose (name) {
		let operand = this.getOperand(name);

		return !!this.page.elementIdElement(operand.value.ELEMENT, this.locators.operands.close);
	}
}

module.exports = PortalSearch;
