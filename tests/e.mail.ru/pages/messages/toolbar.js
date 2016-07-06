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
		let toolbar = '.ui-toolbar-active';

		return this.extend(super.locators, {
			buttons: {
				compose: `${toolbar} .b-toolbar__btn[data-name="compose"]`
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
		this.clickWithRetry(this.locators.buttons[name]);
	}

}

module.exports = MessagesToolbarPage;
