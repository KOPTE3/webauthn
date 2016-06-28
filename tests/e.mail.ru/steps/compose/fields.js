'use strict';

let assert = require('assert');

let ComposePage = require('../../pages/compose');
let ComposeSteps = require('../../steps/compose');
let ComposeFields = require('../../pages/compose/fields');

/** Модуль для работы с формой страницы написания письма */
class ComposeFieldsSteps extends ComposeSteps {
	constructor () {
		super();

		this.composeFields = new ComposeFields();
		this.composePage = new ComposePage();
	}

	/**
	 * Дождаться появления формы написания письма
	 */
	wait () {
		let actual = this.composePage.wait();

		assert(actual, 'Не удалось дождаться показа формы написания письма');
	}

	/**
	 * Получить значение поля по имени
	 *
	 * @see this.composeFields.getField
	 * @param {string} name — имя поля
	 */
	getFieldValue (name) {
		this.composeFields.getFieldValue(name);
	}

	/**
	 * Задать значение поля по имени
	 *
	 * @see this.composeFields.getField
	 * @param {string} name — имя поля
	 * @param {string} value — значение поля
	 */
	setFieldValue (name, value) {
		this.composeFields.setFieldValue(...arguments);
	}

	/**
	 * Очистить поле заданное поле
	 *
	 * @see this.composeFields.getField
	 * @param {string} name — имя поля
	 */
	clearFieldValue (name) {
		this.composeFields.clearFieldValue(name);
	}

	/**
	 * Сделать клик на заданном поле
	 *
	 * @see this.composeFields.getField
	 * @param {string} name — имя поля
	 */
	clickField (name) {
		this.composeFields.clickField(name);
	}

	/**
	 * Показать заданное поле
	 *
	 * @see this.composeFields.getField
	 * @param {string} name — имя поля
	 */
	showField (name) {
		this.composeFields.showField(name);
	}

	/**
	 * Скрыть заданное поле
	 *
	 * @see this.composeFields.getField
	 * @param {string} name — имя поля
	 */
	hideField (name) {
		this.composeFields.showMenuFields();
	}

	/**
	 * Проверить видимость поля "От кого"
	 *
	 * @see this.composeFields.getField
	 * @param {string} name — имя поля
	 */
	isVisibleField (name) {
		let active = this.composeFields.isVisibleField(name);

		asert(active, `Видимость поля ${name} под вопросом`);
	}

	/**
	 * Показать все поля формы
	 */
	isVisibleSelectFields () {
		let active = this.composeFields.isVisibleSelectFields();

		asert(active, 'Видимость списка полей под вопросом');
	}

	/**
	 * Показать все поля формы
	 */
	showAllFields () {
		this.composeFields.showAllFields();
	}

	/**
	 * Скрыть все поля формы
	 */
	hideAllFields () {
		this.composeFields.hideAllFields();
	}
}

module.exports = new ComposeFieldsSteps();
