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
			buttons: {
				reply: `${active} [data-name="fast-reply"]`,
				forward: `${active} [data-compose-act="forward"]`
			}
		});
	}

	/**
	 * Кликает по кнопкам в быстром ответе
	 *
	 * @param {string} name - имя кнопки по которой нужно кликнуть
	 * (reply, forward);
	 */
	clickButton (name) {
		this.clickWithRetry(this.locators.buttons[name]);
	}
}

module.exports = MessageFastanswerPage;
