'use strict';

let assert = require('assert');

let MessagesToolbarPage = require('../../pages/messages/toolbar');
let MessagesSteps = require('../messages');

/** Модуль для работы с формой страницы написания письма */
class MessagesToolbarSteps extends MessagesSteps {
	constructor () {
		super();
		this.toolbarPage = new MessagesToolbarPage();
	}

	/**
	 * Метод кликает по кнопкам
	 *
	 * @param {string} name - имя кнопки
	 * Доступные значения (compose)
	 * */
	clickButton (name) {
		this.toolbarPage.clickButton(name);
	}

}

module.exports = MessagesToolbarSteps;
