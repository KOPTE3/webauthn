'use strict';

let assert = require('assert');

let MessagesPage = require('../../pages/messages');
let MessagesSteps = require('../messages');

/** Модуль для работы с письмами */
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

	/**
	 * Сравнить число писем
	 *
	 * @param {number} count
	 */
	checkLettersCount (count) {
		let actual = this.messagesPage.getLettersCount();

		assert(actual === count, `Число писем не равно ${count}`);
	}

	/**
	 * Проверить наличие письма с заданной темой
	 *
	 * @param {string} subject - тема
	 * @param {boolean} reverse - проверить отсутсвие письма
	 */
	checkLetterBySubject (subject, reverse = false) {
		let actual = this.messagesPage.getLetterIdBySubject(subject);

		if (reverse) {
			assert(!actual, `Присутствует письмо с темой ${subject}`);
		} else {
			assert(actual, `Отсутствует письмо с темой ${subject}`);
		}
	}
}

module.exports = LettersSteps;
