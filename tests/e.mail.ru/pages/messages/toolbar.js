'use strict';

let MessagesPage = require('../messages');

/** Модуль для работы с формой страницы написания письма */
class MessagesToolbarPage extends MessagesPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			buttons: {
				compose: `.b-toolbar__btn[data-name="compose"]`
			}
		});
	}

	/**
	 * Метод кликает по кнопкам
	 *
	 * @param {string} name - имя кнопки
	 * Доступные значения (compose)
	 * */
	clickButton (name) {
		this.clickAll(this.locators.buttons[name]);
	}

}

module.exports = MessagesToolbarPage;
