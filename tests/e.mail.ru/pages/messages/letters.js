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

		return this.extend(super.locators, {
			container: '#b-letters',
			newestLetter: '[data-mnemo="letters"] .b-datalist__item_unread .b-datalist__item__link'
		});
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
		return browser.isExisting(this.locators.newestLetter);
	}
}

module.exports = MessagesLettersPage;
