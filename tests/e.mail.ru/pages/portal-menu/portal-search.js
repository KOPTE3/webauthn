'use strict';

let PortalMenu = require('../portal-menu');
let Advanced = require('../portal-menu/advanced');
let searchUtils = require('../../utils/portal-menu/portal-search');
let constants = require('../../utils/constants');

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

		/* eslint-disable max-len */
		return this.extend(super.locators, {
			container,
			form: `${container} .js-search`,
			searchButton: `${container} [type="submit"]`,
			advancedToggle: `${container} .js-dropdown-button`,
			searchField: `${container} .pm-toolbar__search__label__wrapper`,
			suggests: {
				container: `${container} .pm-toolbar__suggests`,
				title: `${container} .pm-toolbar__suggests .pm-toolbar__suggests__group__title`,
				selected: `${container} .pm-toolbar__suggests .b-dropdown__item-correspondent_selected`,
				advanced: `${container} .pm-toolbar__suggests .pm-toolbar__suggests__advanced a`
			},
			operands: {
				all    : `${container} .b-operand:not([style*="display: none"])`,
				current: `${container} .b-operand_active`,
				message: `${container} [data-operand-name="q_query"]`,
				from   : `${container} [data-operand-name="q_from"]`,
				to     : `${container} [data-operand-name="q_to"]`,
				subject: `${container} [data-operand-name="q_subj"]`,
				unread : `${container} [data-operand-name="q_read"]`,
				flag   : `${container} [data-operand-name="q_flag"]`,
				attach : `${container} [data-operand-name="q_attach"]`,
				date   : `${container} [data-operand-name="q_date"]`,
				blank  : `${container} [data-operand-name="blank"]`,
				icons: {
					unread: '.ico_folder_unread',
					flag  : '.ico_folder_important',
					attach: '.ico_folder_attachment'
				},
				close: '.b-operand__close',
				input: '.b-operand__input',
				dateInput: '.b-operand__date-input',
				active: '.b-operand_active',
				lapse: `${container} [data-operand-name="q_date"] .b-operand__date-lapse`
			},
			body: '#ScrollBody'
		});

		/* eslint-enable */
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
	 * @returns {boolean}
	 */
	hideAdvanced () {
		this.toggleAdvanced();

		return this.page.waitForVisible(this.advanced.locators.container, void 0, true);
	}

	/**
	 * Показать расширенный поиск
	 *
	 * @returns {boolean}
	 */
	showAdvanced () {
		this.toggleAdvanced();

		return !!this.page.waitForVisible(this.advanced.locators.container);
	}

	/**
	 * Получить все активные операнды
	 *
	 * @returns {*[]}
	 */
	getAllOperands () {
		return this.page.elements(this.locators.operands.all);
	}

	/**
	 * Получить имена всех активных операндов
	 *
	 * @returns {string[]}
	 */
	getAllOperandsNames () {
		let operands = this.getAllOperands();

		return operands.value.map(item => {
			let name = this.page.elementIdAttribute(item.ELEMENT, 'data-operand-name');

			return searchUtils.getOperandName(name.value);
		});
	}

	/**
	 * Получить активный операнд
	 *
	 * @return {Element}
	 */
	getActiveOperand () {
		return this.page.element(this.locators.operands.current);
	}

	/**
	 * Вернуть имя активного операнда
	 *
	 * @return {string}
	 */
	getActiveOperandName () {
		let operand = this.getActiveOperand();
		let name = this.page.elementIdAttribute(operand.value.ELEMENT, 'data-operand-name');

		return searchUtils.getOperandName(name.value);
	}

	/**
	 * Получить операнд по имени
	 *
	 * @param {string} name - имя операнда
	 * (message|from|to|subject|unread|flag|attach|date|blank)
	 * @returns {Element}
	 */
	getOperand (name) {
		return this.page.element(this.locators.operands[name]);
	}

	/**
	 * Получить текстовый инпут операнда
	 *
	 * @param {string} name - имя операнда
	 * @returns {Element}
	 */
	getOperandInput (name) {
		let operand = this.getOperand(name);
		let locator = this.locators.operands.input;

		if (name === 'date') {
			locator = this.locators.operands.dateInput;
		}

		return this.page.elementIdElement(operand.value.ELEMENT, locator);
	}

	/**
	 * Получить атрибут readonly инпута операнда
	 *
	 * @param {string} name - имя операнда
	 * @returns {string}
	 */
	getOperandInputReadonly (name) {
		let input = this.getOperandInput(name);

		return input.getAttribute('readonly');
	}

	/**
	 * Получить положение скролла в инпуте операнда
	 *
	 * @param {string} name - имя операнда
	 * @returns {number}
	 */
	getOperandInputScroll (name) {
		let locator = searchUtils.getOperandInputLocator(this.locators.operands, name);

		return this.page.execute(function (selector) {
			return document.querySelector(selector).scrollLeft;
		}, locator).value;
	}

	/**
	 * Получить позицию каретки для инпута операнда
	 *
	 * @param {string} name - имя операнда
	 * @return {*} - объект с полями start, end
	 */
	getOperandInputSelection (name) {
		let locator = searchUtils.getOperandInputLocator(this.locators.operands, name);

		return this.page.execute(function (selector) {
			var input = document.querySelector(selector);

			return {
				start: input.selectionStart,
				end: input.selectionEnd
			};
		}, locator).value;
	}

	/**
	 * Получить текст операнда.
	 *
	 * @param {string} name - имя операнда
	 * @returns {string}
	 */
	getOperandText (name) {
		let input = this.getOperandInput(name);

		return input && input.value ? input.getValue() : '';
	}

	/**
	 * Ввести текст в операнд
	 *
	 * @param {string} name - имя операнда
	 * @param {string} value - что печатать
	 */
	setOperandText (name, value = '') {
		let input = this.getOperandInput(name);

		if (input && input.value) {
			input.setValue(value);
		}
	}

	/**
	 * Нажать в операнде на стрелки клавиатуры
	 *
	 * @param {string} name - имя операнда
	 * @param {string} key - (Up|Down|Left|Right)
	 */
	operandArrowKey (name, key) {
		let input = this.getOperandInput(name);
		let keyCode = constants.UNICODE_CHARACTERS[key];

		input.setValue(keyCode);
	}

	/**
	 * Вернуть текст разброса даты в операнде, если он виден.
	 *
	 * @returns {string}
	 */
	getOperandDateLapse () {
		let text = '';

		if (this.page.isVisible(this.locators.operands.lapse)) {
			text = this.page.getText(this.locators.operands.lapse);
		}

		return text;
	}

	/**
	 * Операнд существует
	 *
	 * @param {string} name - имя операнда
	 * @param {boolean} reverse - операнд не существует
	 * @returns {boolean}
	 */
	hasOperand (name, reverse = false) {
		return this.page.waitForVisible(this.locators.operands[name], void 0, reverse);
	}

	/**
	 * У операнда есть иконка
	 *
	 * @param {string} name - имя операнда (unread|flag|attach)
	 * @returns {boolean}
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
	 * @returns {boolean}
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
	 * @returns {boolean}
	 */
	isOperandActive (name) {
		let active = this.locators.operands.active.slice(1);

		return this.page.hasClass(this.locators.operands[name], active);
	}

	/**
	 * Фокус в инпуте операнда
	 * @param {string} name - имя операнда
	 * @returns {boolean}
	 */
	operandHasFocus (name) {
		let locator = searchUtils.getOperandInputLocator(this.locators.operands, name);

		return this.page.hasFocus(locator);
	}

	/**
	 * Кликнуть на лупу
	 */
	clickSearchButton () {
		this.page.click(this.locators.searchButton);
	}

	/**
	 * Кликнуть в поле поиска,
	 * но не в какой либо из операндов!
	 */
	clickSearchField () {
		let operands = this.getAllOperands();

		if (operands.value.length) {
			let operandId = operands.value[0].ELEMENT;
			let rect = this.page.elementIdSize(operandId);

			this.page.moveTo(operandId, rect.value.width + 1, 1);
			this.page.leftClick();
		} else {
			this.page.click(this.locators.searchField);
		}
	}

	/**
	 * Кликнуть в операнд
	 *
	 * @param {string} name - имя операнда
	 */
	clickOperand (name) {
		this.page.click(this.locators.operands[name]);
	}

	/**
	 * Нажать на крестик в операнде
	 *
	 * @param {string} name - имя операнда
	 */
	clickOperandClose (name) {
		let locator = searchUtils.getOperandLocator(this.locators.operands, name, 'close');

		this.page.click(locator);
	}

	/**
	 * Кликнуть в "пустое место"
	 */
	clickBody () {
		let body = this.page.element(this.locators.body);

		this.page.moveTo(body.value.ELEMENT, 1, 1);
		this.page.leftClick();
	}

	/**
	 * Удалить все операнды
	 */
	removeAllOperands () {
		let blank = this.getOperand('blank');

		if (blank.value) {
			this.clickSearchField();
			this.setOperandText('blank');
		}

		let operandsNames = this.getAllOperandsNames();

		operandsNames.forEach(name => {
			if (name !== 'blank') {
				this.clickOperandClose(name);
			}
		});
	}

	/**
	 * Есть ли саджесты
	 *
	 * @param {boolean} reverse - нет ли саджестов
	 * @returns {boolean}
	 */
	hasSuggests (reverse = false) {
		return this.page.waitForVisible(this.locators.suggests.container,
			void 0, reverse);
	}

	/**
	 * Вернуть текст заголовка саджестов
	 *
	 * @return {string}
	 */
	getSuggestsTitle () {
		return this.page.getText(this.locators.suggests.title);
	}

	/**
	 * Получить текст выбранного пункта саджестов
	 *
	 * @return {string}
	 */
	getSelectedSuggestText () {
		let text = '';

		if (this.page.isVisible(this.locators.suggests.selected)) {
			text = this.page.getText(this.locators.suggests.selected);
		}

		return text;
	}

	/**
	 * Нажать на расширенный поиск в саджестах сохраненных запросов
	 */
	clickRequestsSuggestsAdvanced () {
		this.page.click(this.locators.suggests.advanced);
	}
}

module.exports = PortalSearch;
