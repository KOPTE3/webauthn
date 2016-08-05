'use strict';

let PageObject = require('../../pages');
let actions = require('../../utils/actions');
let store = require('../../store');

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
	 * Базовый локатор для писем
	 *
	 * @type {string}
	 */
	get lettersLocator () {
		return '[data-mnemo="letters"]';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let letters = this.lettersLocator;

		return {
			container: '#b-letters',
			newestLetter: `${letters} .b-datalist__item:first-child`,
			letters: `${letters} .b-datalist__item`,
			letterSubject: '.b-datalist__item__subj',
			letterSnippet: '.b-datalist__item__subj__snippet',
			buttons: {
				compose: '.b-toolbar__btn[data-name="compose"]'
			}
		};
	}

	/**
	 * Переключить треды
	 *
	 * @param {boolean} state
	 * @param {boolean} refresh
	 */
	toggleThreads (state, refresh) {
		actions.helperUpdate(store.helpers.threads, {
			state,
			time: true
		});

		if (refresh) {
			this.page.refresh();
		}
	}

	/**
	 * Открыть самое новое письмо
	 */
	openNewestLetter () {
		this.page.pause(1000);
		this.page.click(this.locators.newestLetter);
	}

	/**
	 * Метод кликает по кнопкам
	 *
	 * @param {string} name - имя кнопки
	 * Доступные значения (compose)
	 */
	clickButton (name) {
		this.page.click(this.locators.buttons[name]);
	}

	/**
	 * Получить все письма
	 *
	 * @return {*}
	 */
	getLetters () {
		return this.page.elements(this.locators.letters);
	}

	/**
	 * Получить id письма по теме.
	 * Если таких несколько, то только самый верхний
	 *
	 * @param {string} subject - тема письма.
	 * @return {string}
	 */
	getLetterIdBySubject (subject) {
		let { value: letters } = this.getLetters();
		let subjectLocator = this.locators.letterSubject;
		let snippetLocator = this.locators.letterSnippet;
		let id;

		letters.some(({ELEMENT: ID}) => {
			let item = this.page.elementIdElement(ID, subjectLocator);
			let snippet = this.page.elementIdElement(ID, snippetLocator);
			let text = item.getText();

			text = text.replace(snippet.getText(), '');

			if (text === subject) {
				id = this.page.elementIdAttribute(ID, 'data-id').value;

				return true;
			}
		});

		return id;
	}

	/**
	 * Получить количество писем
	 *
	 * @return {number}
	 */
	getLettersCount () {
		let { value } = this.getLetters();

		return value.length;
	}
}

module.exports = MessagesPage;
