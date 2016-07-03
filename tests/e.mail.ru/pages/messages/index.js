'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы списка писем */
class MessagesPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/messages/inbox';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '#b-letters',
			newestLetter: '[data-mnemo="letters"] .b-datalist__item:first-child',
			letters: '[data-mnemo="letters"] .b-datalist__item',
			buttons: {
				compose: '.b-toolbar__btn[data-name="compose"]'
			}
		};
	}

	/**
	 * Открыть самое новое письмо
	 */
	openNewestLetter () {
		browser.pause(1000);
		this.page.click(this.locators.newestLetter);
	}

	/**
	 * Метод кликает по кнопкам
	 *
	 * @param {string} name - имя кнопки
	 * Доступные значения (compose)
	 * */
	clickButton (name) {
		this.page.click(this.locators.buttons[name]);
	}

}

module.exports = MessagesPage;
