'use strict';

let assert = require('assert');

let MessagesLettersPage = require('../../pages/messages/letters');
let MessagesSteps = require('../messages');

/** Модуль для работы с формой страницы написания письма */
class MessagesLettersSteps extends MessagesSteps {
	constructor () {
		super();
		this.lettersPage = new MessagesLettersPage();
	}

	/**
	 * Открыть самое новое письмо
	 */
	openNewestLetter () {
		this.lettersPage.openNewestLetter();
	}
}

module.exports = new MessagesLettersSteps();
