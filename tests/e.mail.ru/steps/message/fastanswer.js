'use strict';

let assert = require('assert');

let MessageFastanswerPage = require('../../pages/message/fastanswer');
let MessageSteps = require('../message');

/** Модуль для работы с формой страницы написания письма */
class MessageFastanswerSteps extends MessageSteps {
	constructor () {
		super();
		this.fastanswerPage = new MessageFastanswerPage();
	}

	/**
	 * Кликает по кнопкам в быстром ответе
	 *
	 * @param {string} name - имя кнопки по которой нужно кликнуть
	 * (reply, forward);
	 */
	clickButton (name) {
		this.fastanswerPage.clickButton(name);
	}

}

module.exports = new MessageFastanswerSteps();
