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
			save: '#formMail .btn_main[type="submit"]',
			fields: {
				// Включать содержимое исходного письма в ответ
				sendReplyIncludeMessage: '[name="Send.Reply.IncludeMessage"]'
			}
		};
	}

	/**
	 * Проверить что поле выбрано
	 *
	 * @param {string} name — имя поля.
	 * Доступные значения (sendReplyIncludeMessage)
	 *
	 * @returns {Promise}
	 */
	isFieldSelected (name) {
		return this.page.isSelected(this.locators.fields[name]);
	}

	/**
	 * Получить элемент поля по имени
	 *
	 * @param {string} name — имя поля.
	 * Доступные значения (sendReplyIncludeMessage)
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

	/**
	 * Сохранить значения формы
	 * */
	save () {
		this.page.click(this.locators.save);
	}
}

module.exports = FieldsPage;
