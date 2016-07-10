'use strict';

let Messages = require('../../pages/messages');

/** Модуль для работы с письмами */
module.exports = {
	messages: new Messages(),

	/**
	 * Получить id письма по теме.
	 * Если таких несколько, то только самый верхний
	 *
	 * @param {string} subject - тема письма.
	 * @return {string}
	 */
	getLetterIdBySubject (subject) {
		return this.messages.getLetterIdBySubject(subject);
	}
};
