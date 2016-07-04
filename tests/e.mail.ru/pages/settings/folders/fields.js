'use strict';

let PageObject = require('../../../pages');

class FieldsPage extends PageObject {
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
			fields: {
				name: '.is-folder-add_in [name="name"]'
			}
		};
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
	 * Проверить видимость поля
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
}

module.exports = FieldsPage;
