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
			buttons: {
				compose: '.b-toolbar__btn[data-name="compose"]'
			}
		};
	}

	/**
	 * Метод кликает по кнопкам
	 *
	 * @param {string} name - имя кнопки
	 * Доступные значения (compose)
	 * */
	clickButton (name) {
		console.log('click');
		this.page.click(this.locators.buttons[name]);
	}

}

module.exports = MessagesPage;
