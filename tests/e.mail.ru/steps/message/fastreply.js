'use strict';

let assert = require('assert');

let MessagefastreplyPage = require('../../pages/message/fastreply');
let MessageSteps = require('../message');

/** Модуль для работы с формой страницы написания письма */
class MessagefastreplySteps extends MessageSteps {
	constructor () {
		super();
		this.fastreplyPage = new MessagefastreplyPage();
	}

	/**
	 * Кликает по кнопкам в быстром ответе
	 *
	 * @param {string} name - имя кнопки по которой нужно кликнуть
	 * (reply, forward);
	 */
	clickButton (name) {
		this.fastreplyPage.clickButton(name);
	}
}

module.exports = new MessagefastreplySteps();
