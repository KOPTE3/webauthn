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
	 * Открывает форму быстрого ответа
	 */
	open () {
		this.fastanswerPage.open();
	}

}

module.exports = new MessageFastanswerSteps();
