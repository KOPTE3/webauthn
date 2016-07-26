'use strict';

let ComposePage = require('../compose');
let composeFieldsStore = require('../../store/compose/fields');

/** Модуль для работы с формой страницы написания письма */
class ComposeFields extends ComposePage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			container: '.js-compose-header',
			fields: {
				priority: '[name="Priority"]',
				receipt : '[name="Receipt"]',
				remind  : '[name="remind"]',
				from    : '.js-compose__header__from',
				to      : '.compose__header__field [data-original-name="To"]',
				cc      : '.compose__header__field [data-original-name="CC"]',
				bcc     : '.compose__header__field [data-original-name="BCC"]',
				subject : '.compose__header__field[name="Subject"]'
			},
			selectField    : '#dropdown-select-fields .dropdown__checkbox',
			selectFieldItem: '#dropdown-select-fields .dropdown__list_multiselect',
			dropdowns: {
				fromEmail: {
					ctrl: '.js-compose__select_email .js-compose__dropdown_email',
					list: '.js-compose__select_email .js-compose__select_email-item',
					item: value => '.js-compose__select_email ' +
						`.js-compose__select_email-item [data-email="${value}"]`
				}
			}
		});
	}

	/**
	 * Дождаться появления формы написания письма
	 */
	wait () {
		this.page.waitForExist(this.locators.container);
	}

	/**
	 * Получить элемент поля по имени
	 *
	 * @param {string} name — имя поля.
	 * Доступные значения (from, to, cc, bcc, subject, priority, receipt, remind)
	 *
	 * @returns {Promise}
	 */
	getField (name) {
		return this.page.element(this.locators.fields[name]);
	}

	/**
	 * Сделать клик на заданном поле
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 */
	clickField (name) {
		this.page.click(this.locators.fields[name]);
	}

	/**
	 * Показать заданное поле
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 */
	showField (name) {
		this.showSelectFields();
	}

	/**
	 * Скрыть заданное поле
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 */
	hideField (name) {
		this.showSelectFields();
	}

	/**
	 * Проверить видимость поля "От кого"
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 * @returns {boolean}
	 */
	isVisibleField (name) {
		return this.page.isVisible(this.locators.fields[name]);
	}

	/**
	 * Очистить поле заданное поле
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 */
	clearFieldValue (name) {
		this.getField(name).setValue('');
	}

	/**
	 * Получить значение поля по имени
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 * @returns {string}
	 */
	getFieldValue (name) {
		return this.getField(name).getValue();
	}

	/**
	 * Задать значение поля по имени
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 * @param {string} value — значение поля
	 */
	setFieldValue (name, value) {
		this.getField(name).setValue(value);
	}

	setDropdownValue (name, value) {
		let dropdown = this.locators.dropdowns[name];

		this.page.click(dropdown.ctrl);
		this.page.waitForVisible(dropdown.list);
		this.page.click(dropdown.item(value));
	}

	/**
	 * Получить ссылку на элемент списка полей
	 *
	 * @returns {Promise}
	 */
	getMenuFields () {
		return this.page.element(this.locators.selectField);
	}

	/**
	 * Переключить все доступные поля формы
	 *
	 * @param {boolean} state — состояние
	 */
	toggleAllFields (state) {
		for (let name of composeFieldsStore.hiddenFields) {
			if (state) {
				this.showField(name);
			} else {
				this.hideField(name);
			}
		}
	}

	/**
	 * Показать все поля формы
	 */
	showAllFields () {
		this.toggleAllFields(true);
	}

	/**
	 * Скрыть все поля формы
	 */
	hideAllFields () {
		this.toggleAllFields(false);
	}

	/**
	 * Проверить видимость списка полей
	 *
	 * @returns {boolean}
	 */
	isVisibleSelectFields () {
		return this.page.isVisible(this.locators.selectFieldItem);
	}

	/**
	 * Скрыть список полей
	 */
	hideSelectFields () {
		if (this.isVisibleSelectFields()) {
			this.page.click(this.locators.selectField);
			this.page.waitForVisible(this.locators.selectFieldItem, 3000, true);
		}
	}

	/**
	 * Показать список полей
	 */
	showSelectFields () {
		if (!this.isVisibleSelectFields()) {
			this.page.click(this.locators.selectField);
			this.page.waitForVisible(this.locators.selectFieldItem, 3000);
		}
	}

	clickSelectFieldItem (name) {
		this.page.click(`${this.locators.selectFieldItem} [data-type="${name}"]`);
	}
}

module.exports = ComposeFields;
