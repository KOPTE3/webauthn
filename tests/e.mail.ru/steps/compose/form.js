'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let compose = require('../../pages/compose');
let form = require('../../pages/compose/form');

/** Модуль для работы с формой страницы написания письма */
class Form extends Steps {
	constructor () {
		super();
	}

	/**
	 * Дождаться появления формы написания письма
	 */
	wait () {
		let actual = compose.wait();

		assert(actual, 'Не удалось открыть форму написания письма');
	}

	/**
	 * Сделать клик на заданном поле
	 *
	 * @see form.getFieldElement
	 * @param {string} name — имя поля
	 */
	clickField (name) {
		form.clickField(name);
	}

	/**
	 * Показать заданное поле
	 *
	 * @see form.getFieldElement
	 * @param {string} name — имя поля
	 */
	showField (name) {
		form.showField(name);
	}

	/**
	 * Скрыть заданное поле
	 *
	 * @see form.getFieldElement
	 * @param {string} name — имя поля
	 */
	hideField (name) {
		form.showMenuFields();
	}

	/**
	 * Проверить видимость поля "От кого"
	 *
	 * @see form.getFieldElement
	 * @param {string} name — имя поля
	 */
	isVisibleField (name) {
		let active = form.isVisibleField(name);

		asert(active, `Видимость поля ${name} под вопросом`);
	}

	/**
	 * Очистить поле заданное поле
	 *
	 * @see form.getFieldElement
	 * @param {string} name — имя поля
	 */
	clearField (name) {
		form.clearField(name);
	}

	/**
	 * Задать значение поля по имени
	 *
	 * @see form.getFieldElement
	 * @param {string} name — имя поля
	 * @param {string} value — значение поля
	 */
	setFieldValue (name, value) {
		form.setFieldValue(...arguments);
	}

	/**
	 * Показать все поля формы
	 */
	isVisibleMenuFields () {
		let active = form.isVisibleMenuFields();

		asert(active, 'Видимость списка полей под вопросом');
	}

	/**
	 * Показать все поля формы
	 */
	showAllFields () {
		form.showAllFields();
	}

	/**
	 * Скрыть все поля формы
	 */
	hideAllFields () {
		form.hideAllFields();
	}

}

module.exports = new Form();
