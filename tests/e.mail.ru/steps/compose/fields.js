'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let compose = require('../../pages/compose');
let fields = require('../../pages/compose/fields');

/** Модуль для работы с формой страницы написания письма */
class Fields extends Steps {
	constructor () {
		super();
	}

	/**
	 * Дождаться появления формы написания письма
	 */
	wait () {
		let actual = compose.wait();

		assert(actual, 'Не удалось дождаться показа формуынаписания письма');
	}

	/**
	 * Получить значение поля по имени
	 *
	 * @see fields.getField
	 * @param {string} name — имя поля
	 */
	getFieldValue (name) {
		fields.getFieldValue(name);
	}

	/**
	 * Задать значение поля по имени
	 *
	 * @see fields.getField
	 * @param {string} name — имя поля
	 * @param {string} value — значение поля
	 */
	setFieldValue (name, value) {
		fields.setFieldValue(...arguments);
	}

	/**
	 * Очистить поле заданное поле
	 *
	 * @see fields.getField
	 * @param {string} name — имя поля
	 */
	clearFieldValue (name) {
		fields.clearFieldValue(name);
	}

	/**
	 * Сделать клик на заданном поле
	 *
	 * @see fields.getField
	 * @param {string} name — имя поля
	 */
	clickField (name) {
		fields.clickField(name);
	}

	/**
	 * Показать заданное поле
	 *
	 * @see fields.getField
	 * @param {string} name — имя поля
	 */
	showField (name) {
		fields.showField(name);
	}

	/**
	 * Скрыть заданное поле
	 *
	 * @see fields.getField
	 * @param {string} name — имя поля
	 */
	hideField (name) {
		fields.showMenuFields();
	}

	/**
	 * Проверить видимость поля "От кого"
	 *
	 * @see fields.getField
	 * @param {string} name — имя поля
	 */
	isVisibleField (name) {
		let active = fields.isVisibleField(name);

		asert(active, `Видимость поля ${name} под вопросом`);
	}

	/**
	 * Показать все поля формы
	 */
	isVisibleSelectFields () {
		let active = fields.isVisibleSelectFields();

		asert(active, 'Видимость списка полей под вопросом');
	}

	/**
	 * Показать все поля формы
	 */
	showAllFields () {
		fields.showAllFields();
	}

	/**
	 * Скрыть все поля формы
	 */
	hideAllFields () {
		fields.hideAllFields();
	}

}

module.exports = new Fields();
