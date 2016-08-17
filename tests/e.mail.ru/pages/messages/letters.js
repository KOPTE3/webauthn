'use strict';

let MessagesPage = require('../messages');

/** Модуль для работы с формой страницы написания письма */
class MessagesLettersPage extends MessagesPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let active = 'div:not([style *= "none"])>';
		let letters = '[data-mnemo="letters"]';

		return this.extend(super.locators, {
			container: '#b-letters',
			letter: `${letters} .b-datalist__item__link`,
			unreadLetter: `${letters} .b-datalist__item_unread .b-datalist__item__link`,
			newestLetter: `${letters} .b-datalist__item:first-of-type .b-datalist__item__link`,
			content: {
				attach: '.b-datalist__item__attach'
			}
		});
	}

	get newestLetter () {
		return this.page.element(this.locators.newestLetter);
	}

	/**
	 * Открыть письмо по теме
	 * @param  {string} subject
	 * @returns {boolean} - смог ли открыть письмо
	 */
	openBySubject (subject) {
		return this.clickWithRetry(`${this.locators.letter}[data-subject*='${subject}']`);
	}

	/**
	 * Открыть самое новое письмо
	 *
	 * @returns {boolean} - смог ли нажать на новое письмо
	 */
	openNewestLetter () {
		return this.clickWithRetry(this.locators.newestLetter);
	}

	/**
	 * Проверяет есть ли новое письмо
	 *
	 * @returns {boolean}
	 */
	hasNewestLetter () {
		return this.page.isExisting(this.locators.newestLetter);
	}

	/**
	 * Проверить, что у нового письма есть скрепка
	 *
	 * @return {boolean}
	 */
	isNewestLetterWithAttaches () {
		let locator = `${this.locators.newestLetter} ${this.locators.content.attach}`;

		return this.page.isExisting(locator);
	}
}

module.exports = MessagesLettersPage;
