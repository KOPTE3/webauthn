'use strict';

let assert = require('assert');

let MessagesLettersPage = require('../../pages/messages/letters');
let MessagesSteps = require('../messages');
let MessagePage = require('../message');


/** Модуль для работы с формой страницы написания письма */
class MessagesLettersSteps extends MessagesSteps {
	constructor () {
		super();
		this.lettersPage = new MessagesLettersPage();
		this.messagePage = new MessagePage();
	}

	/**
	 * Открыть самое новое письмо
	 */
	openNewestLetter () {
		this.lettersPage.openNewestLetter();
		this.messagePage.wait();

		assert(this.messagePage.isVisible, 'страница сообщения не показана');
	}
}

module.exports = new MessagesLettersSteps();
