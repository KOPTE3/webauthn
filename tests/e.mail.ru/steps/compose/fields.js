'use strict';

let assert = require('assert');

let ComposePage = require('../../pages/compose');
let ComposeFields = require('../../pages/compose/fields');
let ComposeSteps = require('../compose');

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
	 * Проверить значение поля по имени
	 *
	 * @see this.composeFields.getField
	 * @param {string} name — имя поля
	 * @param {string} value — значение поля
	 */
	checkFieldValue (name, value) {
		let actual = this.composeFields.getFieldValue(name);

		assert.equal(actual, value, `Значение поля ${name} не равно ${value}`);
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
	 * Проверить значение серой подсказки в поле ввода
	 *
	 * @param {string} name — имя поля
	 * @param {string} value
	 */
	checkFieldSuggestStart (name, value) {
		let actual = this.composeFields.getFieldSuggestValue(name);

		actual = actual.substring(0, value.length);

		assert.equal(actual, value, `Значение серой подсказки в поле ${name} не равно ${value}`);
	}

	/**
	 * Задать значение дропдауна
	 *
	 * @param {string} name — имя дропдауна
	 * @param {string} value — значение
	 */
	setDropdownValue (name, value) {
		this.composeFields.setDropdownValue(...arguments);
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

		assert(active, `Видимость поля ${name} под вопросом`);
	}

	/**
	 * Раскрыть поле
	 *
	 * @param {string} name — имя поля
	 */
	expandField (name) {
		let actual = this.composeFields.isVisibleField(name.toLowerCase());

		if (!actual) {
			this.clickSelectFieldItem(name);
		}
	}

	/**
	 * Показать все поля формы
	 */
	isVisibleSelectFields () {
		let active = this.composeFields.isVisibleSelectFields();

		assert(active, 'Видимость списка полей под вопросом');
	}

	/**
	 * Показать список полей
	 */
	showSelectFields () {
		this.composeFields.showSelectFields();
	}

	/**
	 * Кликнуть по полю из списка
	 *
	 * @param {string} name - имя поля
	 */
	clickSelectFieldItem (name) {
		this.showSelectFields();
		this.composeFields.clickSelectFieldItem(name);
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

module.exports = ComposeFieldsSteps;
