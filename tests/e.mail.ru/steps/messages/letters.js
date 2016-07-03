'use strict';

let assert = require('assert');

let MessagesPage = require('../../pages/messages');
let MessagesSteps = require('../messages');

/** Модуль для работы с формой страницы написания письма */
class LettersSteps extends MessagesSteps {
	constructor () {
		super();

		this.messagesPage = new MessagesPage();
	}

	/**
	 * Открыть самое новое письмо
	 */
	openNewestLetter () {
		this.messagesPage.openNewestLetter();
	}
}

module.exports = new LettersSteps();
