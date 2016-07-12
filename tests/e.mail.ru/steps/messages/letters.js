'use strict';

let assert = require('assert');

let MessagesLettersPage = require('../../pages/messages/letters');
let MessagesSteps = require('../messages');
let MessagePage = require('../../pages/message');

/** Модуль для работы с письмами */
class LettersSteps extends MessagesSteps {
	constructor () {
		super();
		this.lettersPage = new MessagesLettersPage();
		this.messagePage = new MessagePage();
	}

	/**
	 * Открыть самое новое письмо
	 */
	openNewestLetter () {
		assert(this.lettersPage.openNewestLetter(), 'не удалось кликнуть по новому письму');
		this.messagePage.wait();
		assert(this.messagePage.isVisible(), 'страница сообщения не показана');
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
