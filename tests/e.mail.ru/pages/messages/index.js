'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы списка писем */
class MessagesPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/messages/inbox';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let letters = '[data-mnemo="letters"]';

		return {
			container: '#b-letters',
			newestLetter: `${letters} .b-datalist__item:first-child`,
			letters: `${letters} .b-datalist__item`,
			letterSubject: '.b-datalist__item__subj',
			buttons: {
				compose: '.b-toolbar__btn[data-name="compose"]'
			}
		};
	}

	/**
	 * Открыть самое новое письмо
	 */
	openNewestLetter () {
		browser.pause(1000);
		this.page.click(this.locators.newestLetter);
	}

	/**
	 * Метод кликает по кнопкам
	 *
	 * @param {string} name - имя кнопки
	 * Доступные значения (compose)
	 * */
	clickButton (name) {
		this.page.click(this.locators.buttons[name]);
	}

	/**
	 * Получить id письма по теме.
	 * Если таких несколько, то только самый верхний
	 *
	 * @param {string} subject - тема письма.
	 * @return {string}
	 */
	getLetterIdBySubject (subject) {
		let {value: messages} = this.page.elements(this.locators.letters);
		let subjectLocator = this.locators.letterSubject;
		let id;

		messages.some(({ELEMENT: ID}) => {
			let title = this.page.elementIdElement(ID, subjectLocator);

			if (title.getText() === subject) {
				id = this.page.elementIdAttribute(ID, 'data-id').value;

				return true;
			}
		});

		return id;
	}

}

module.exports = MessagesPage;
