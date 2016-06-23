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
	 * Кликнуть на поле "От кого"
	 */
	clickFromField () {

	}

	/**
	 * Кликнуть на поле "Кому"
	 */
	clickToField () {

	}

	/**
	 * Кликнуть на поле "Копия"
	 */
	clickCCField () {

	}

	/**
	 * Кликнуть на поле "Скрытая копия"
	 */
	clickBCCField () {

	}

	/**
	 * Кликнуть на поле "Тема"
	 */
	clickSubjectField () {

	}

	/**
	 * Заполнить поле "От кого"
	 */
	setFromField () {

	}

	/**
	 * Заполнить поле "Кому"
	 */
	setToField () {

	}

	/**
	 * Заполнить поле "Копия"
	 */
	setCCField () {

	}

	/**
	 * Заполнить поле формы "Скрытая копия"
	 */
	setBCCField () {

	}

	/**
	 * Заполнить поле формы "Тема"
	 */
	setSubjectField () {

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
	 * Получить элемент поля "Кому"
	 *
	 * @returns {Promise}
	 */
	getToField () {
		return browser.element(this.locators.filedTo);
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
	 * Получить элемент поля "Скрытая копия"
	 *
	 * @returns {Promise}
	 */
	getBCCField () {
		return browser.element(this.locators.filedBCC);
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
	 * Получить данные поля "От кого"
	 */
	getFromValue () {

	}

	/**
	 * Получить данные поля "Кому"
	 */
	getToValue () {

	}


	/**
	 * Получить данные поля "Копия"
	 */
	getCCValue () {

	}

	/**
	 * Получить данные поля "Скрытая копия"
	 */
	getBCCValue () {

	}

	/**
	 * Получить данные поля "Тема"
	 */
	getSubjectValue () {

	}

	/**
	 * Очистить поле "От кого"
	 */
	clearFromField () {

	}

	/**
	 * Очистить поле "От кого"
	 */
	clearFromField () {

	}

	/**
	 * Очистить поле "Копия"
	 */
	clearCCField () {

	}

	/**
	 * Очистить поле "Скрытая копия"
	 */
	clearBCCField () {

	}

	/**
	 * Очистить поле "Тема"
	 */
	clearSubjectField () {

	}

	/**
	 * Показать поле "От кого"
	 */
	showFromField () {

	}

	/**
	 * Показать поле "Кому"
	 */
	showToField () {

	}

	/**
	 * Показать поле "Копия"
	 */
	showCCField () {

	}

	/**
	 * Показать поле "Скрытая копия"
	 */
	showBCCField () {

	}

	/**
	 * Показать поле "Тема"
	 */
	showSubjectField () {

	}

	/**
	 * Скрыть поле "От кого"
	 */
	hideFromField () {

	}

	/**
	 * Скрыть поле "Кому"
	 */
	hideToField () {

	}

	/**
	 * Скрыть поле "Копия"
	 */
	hideCCField () {

	}

	/**
	 * Скрыть поле "Скрытая копия"
	 */
	hideBCCField () {

	}

	/**
	 * Скрыть поле "Тема"
	 */
	hideSubjectField () {

	}

	/**
	 * Проверить видимость поля "От кого"
	 */
	isVisibleFromField () {

	}

	/**
	 * Проверить видимость поля "Кому"
	 */
	isVisibleToField () {

	}

	/**
	 * Проверить видимость поля "Копия"
	 */
	isVisibleCCField () {

	}

	/**
	 * Проверить видимость поля "Скрытая копия"
	 */
	isVisibleBCCField () {

	}

	/**
	 * Проверить видимость поля "Тема"
	 */
	isVisibleSubjectField () {

	}
}

module.exports = new Form();
