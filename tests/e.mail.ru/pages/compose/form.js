'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с формой страницы написания письма */
class Form extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.compose-head',
			fields: {
				priority: '[name="Priority"]',
				receipt : '[name="Receipt"]',
				from    : '.js-compose__header__from',
				to      : '.compose__header__field [data-original-name="To"]',
				cc      : '.compose__header__field [data-original-name="CC"]',
				bcc     : '.compose__header__field [data-original-name="BCC"]',
				subject : '.compose__header__field [name="Subject"]'
			},
			filedRemind   : '[name="remind"]',
			fieldMenu     : '#dropdown-select-fields .dropdown__checkbox',
			fieldMenuItems: '#dropdown-select-fields .dropdown__list_multiselect'
		};
	}

	/**
	 * Дождаться появления формы написания письма
	 *
	 * @returns {boolean}
	 */
	wait () {
		return this.page.waitForExist(this.locators.container);
	}

	/**
	 * Получить элемент поля по имени
	 *
	 * @param {string} name — имя поля.
	 * Доступные значения (from, to, cc, bcc, subject, priority, receipt)
	 *
	 * @returns {Promise}
	 */
	getFieldElement (name) {
		return this.page.element(this.locators.fields[name]);
	}

	/**
	 * Сделать клик на заданном поле
	 *
	 * @see getFieldElement
	 * @param {string} name — имя поля
	 */
	clickField (name) {
		this.page.click(this.locators.filds[name]);
	}

	/**
	 * Показать заданное поле
	 *
	 * @see getFieldElement
	 * @param {string} name — имя поля
	 */
	showField (name) {
		this.showMenuFields();
	}

	/**
	 * Скрыть заданное поле
	 *
	 * @see getFieldElement
	 * @param {string} name — имя поля
	 */
	hideField (name) {
		this.showMenuFields();
	}

	/**
	 * Проверить видимость поля "От кого"
	 *
	 * @see getFieldElement
	 * @param {string} name — имя поля
	 * @returns {boolean}
	 */
	isVisibleField (name) {
		return this.page.isVisible(this.locators.fields[name]);
	}

	/**
	 * Очистить поле заданное поле
	 *
	 * @see getFieldElement
	 * @param {string} name — имя поля
	 */
	clearField (name) {
		this.getFieldElement(name).setValue('');
	}

	/**
	 * Задать значение поля по имени
	 *
	 * @see getFieldElement
	 * @param {string} name — имя поля
	 * @param {string} value — значение поля
	 */
	setFieldValue (name, value) {
		this.getFieldElement(name).keys(value);
	}

	/**
	 * Получить ссылку на элемент списка полей
	 *
	 * @returns {Promise}
	 */
	getMenuFields () {
		return this.page.element(this.locators.fieldMenu);
	}

	/**
	 * Переключить все доступные поля формы
	 *
	 * @param {boolean} state — состояние
	 */
	toggleAllFields (state) {
		let fields = ['to', 'from', 'cc', 'bcc'];

		for (let name of fields) {
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
	isVisibleMenuFields () {
		return this.page.isVisible(this.locators.fieldMenu);
	}

	/**
	 * Скрыть список полей
	 */
	hideMenuFields () {
		if (this.isVisibleMenuFields()) {
			this.page.click(this.locators.fieldMenu);
		}
	}

	/**
	 * Показать список полей
	 */
	showMenuFields () {
		if (!this.isVisibleMenuFields()) {
			this.page.click(this.locators.fieldMenu);
		}
	}
}

module.exports = new Form();
