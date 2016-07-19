'use strict';

let assert = require('assert');

let MessageFastReplyPage = require('../../pages/message/fastreply');
let MessageSteps = require('../message');

/** Модуль для работы с формой страницы написания письма */
class MessageFastReplySteps extends MessageSteps {
	constructor () {
		super();
		this.fastreplyPage = new MessageFastReplyPage();
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

module.exports = MessageFastReplySteps;
