'use strict';

let Messages = require('../../pages/messages');

let messages = new Messages();

/** Модуль для работы с письмами */
class MessagesUtils {
	static get messages () {
		return messages;
	}

	/**
	 * Получить id письма по теме.
	 * Если таких несколько, то только самый верхний
	 *
	 * @param {string} subject - тема письма.
	 * @return {string}
	 */
	static getLetterIdBySubject (subject) {
		return this.messages.getLetterIdBySubject(subject);
	}
}

module.exports = MessagesUtils;
