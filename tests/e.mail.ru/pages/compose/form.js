'use strict';

let PageObject = require('../../pages');

/** @namespace browser */

class Form extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container   : '.compose-head',
			filedFrom   : '.compose-sender',
			filedTo     : '[data-original-name="To"]',
			filedCC     : '[data-original-name="CC"]',
			filedBCC    : '[data-original-name="BCC"]',
			filedSubject: '[name="Subject"]'
		};
	}

	/**
	 * Дождаться появления формы написания письма
	 *
	 * @returns {boolean}
	 */
	wait () {
		return browser.waitForExist(this.locators.container);
	}

	/**
	 * Заполнить поле "От кого"
	 */
	setFromField () {

	}

	/**
	 * Кликнуть на поле "От кого"
	 */
	clickFromField () {

	}

	/**
	 * Получить элемент поля "От кого"
	 *
	 * @returns {Promise}
	 */
	getFromField () {
		return browser.element(this.locators.filedFrom);
	}

	/**
	 * Получить данные поля "От кого"
	 */
	getFromValue () {

	}

	/**
	 * Очистить поле "От кого"
	 */
	clearFromField () {

	}

	/**
	 * Показать поле "От кого"
	 */
	showFromField () {

	}

	/**
	 * Скрыть поле "От кого"
	 */
	hideFromField () {

	}

	/**
	 * Проверить видимость поля "От кого"
	 */
	isVisibleFromField () {

	}

	/**
	 * Кликнуть на поле "Кому"
	 */
	clickToField () {

	}

	/**
	 * Заполнить поле "Кому"
	 */
	setToField () {

	}

	/**
	 * Получить элемент поля "Кому"
	 *
	 * @returns {Promise}
	 */
	getToField () {
		return browser.element(this.locators.filedTo);
	}

	/**
	 * Получить данные поля "Кому"
	 */
	getToValue () {

	}

	/**
	 * Очистить поле "От кого"
	 */
	clearFromField () {

	}

	/**
	 * Показать поле "Кому"
	 */
	showToField () {

	}

	/**
	 * Скрыть поле "Кому"
	 */
	hideToField () {

	}

	/**
	 * Проверить видимость поля "Кому"
	 */
	isVisibleToField () {

	}

	/**
	 * Кликнуть на поле "Копия"
	 */
	clickCCField () {

	}

	/**
	 * Заполнить поле "Копия"
	 */
	setCCField () {

	}

	/**
	 * Получить элемент поля "Копия"
	 *
	 * @returns {Promise}
	 */
	getCCField () {
		return browser.element(this.locators.filedCC);
	}

	/**
	 * Получить данные поля "Копия"
	 */
	getCCValue () {

	}

	/**
	 * Очистить поле "Копия"
	 */
	clearCCField () {

	}

	/**
	 * Показать поле "Копия"
	 */
	showCCField () {

	}

	/**
	 * Скрыть поле "Копия"
	 */
	hideCCField () {

	}

	/**
	 * Проверить видимость поля "Копия"
	 */
	isVisibleCCField () {

	}

	/**
	 * Кликнуть на поле "Скрытая копия"
	 */
	clickBCCField () {

	}

	/**
	 * Заполнить поле формы "Скрытая копия"
	 */
	setBCCField () {

	}

	/**
	 * Получить элемент поля "Скрытая копия"
	 *
	 * @returns {Promise}
	 */
	getBCCField () {
		return browser.element(this.locators.filedBCC);
	}

	/**
	 * Получить данные поля "Скрытая копия"
	 */
	getBCCValue () {

	}

	/**
	 * Очистить поле "Скрытая копия"
	 */
	clearBCCField () {

	}

	/**
	 * Показать поле "Скрытая копия"
	 */
	showBCCField () {

	}

	/**
	 * Скрыть поле "Скрытая копия"
	 */
	hideBCCField () {

	}

	/**
	 * Проверить видимость поля "Скрытая копия"
	 */
	isVisibleBCCField () {

	}

	/**
	 * Кликнуть на поле "Тема"
	 */
	clickSubjectField () {

	}

	/**
	 * Заполнить поле формы "Тема"
	 */
	setSubjectField () {

	}

	/**
	 * Получить элемент поля "Тема"
	 *
	 * @returns {Promise}
	 */
	getSubjectField () {
		return browser.element(this.locators.filedSubject);
	}

	/**
	 * Получить данные поля "Тема"
	 */
	getSubjectValue () {

	}

	/**
	 * Очистить поле "Тема"
	 */
	clearSubjectField () {

	}

	/**
	 * Показать поле "Тема"
	 */
	showSubjectField () {

	}

	/**
	 * Скрыть поле "Тема"
	 */
	hideSubjectField () {

	}

	/**
	 * Проверить видимость поля "Тема"
	 */
	isVisibleSubjectField () {

	}
}

module.exports = new Form();
