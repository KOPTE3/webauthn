'use strict';

let assert = require('assert');

let MessagesLettersPage = require('../../pages/messages/letters');
let MessagesSteps = require('../messages');
let MessagePage = require('../../pages/message');

let ComposePage = require('../../pages/compose');

/** Модуль для работы с письмами */
class LettersSteps extends MessagesSteps {
	constructor () {
		super();
		this.lettersPage = new MessagesLettersPage();
		this.messagePage = new MessagePage();
		this.composePage = new ComposePage();
	}

	/**
	 * Открыть письмо по теме
	 * @param  {string} subject
	 */
	openBySubject (subject) {
		assert(this.lettersPage.openBySubject(subject),
			`не удалось кликнуть пописьму c темой ${subject}`);
		this.messagePage.wait();
		assert(this.messagePage.isVisible(), 'страница сообщения не показана');
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
	 * Открыть первый шаблон/черновик
	 *
	 */
	openFirstCompose () {
		assert(this.lettersPage.openNewestLetter(), 'не удалось кликнуть по шаблону/черновику');
		this.composePage.wait();
		assert(this.composePage.isVisible(), 'страница с открытм шаблоном/черновиком не показана');
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

	/**
	 * Ждать пока новое письмо не появится
	 */
	waitForNewestLetter () {
		let page = this.lettersPage;
		let hasNewestLetter = page.hasNewestLetter.bind(page);

		try {
			page.refreshUntilCondition(hasNewestLetter);
		} catch (error) {
			assert(false, 'Нового сообщения нет: ' + error);
		}
	}
}

module.exports = LettersSteps;
