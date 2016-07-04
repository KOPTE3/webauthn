'use strict';

let MessagePage = require('../message');

/** Модуль для работы с формой страницы написания письма */
class MessageFastanswerPage extends MessagePage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let active = '.b-letter_expanded';

		return this.extend(super.locators, {
			textarea: `${active} [data-name="fast-reply"]`
		});
	}

	/**
	 * Открывает форму быстрого ответа
	 */
	open () {
		this.page.waitForExist(this.locators.textarea);
		this.page.click(this.locators.textarea);
	}
}

module.exports = MessageFastanswerPage;
