'use strict';

let MessagePage = require('../message');

/** Модуль для работы с формой страницы написания письма */
class MessagefastreplyPage extends MessagePage {
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
		let toolbar = '[data-mnemo="toolbar-fastreply"]';

		return this.extend(super.locators, {
			buttons: {
				reply: `${active} [data-name="fast-reply"]`,
				forward: `${active} [data-compose-act="forward"]`
			},

			toolbar: {
				resend: `${toolbar} [data-mnemo="resend"]`
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

	/**
	 * Пересылка письма из быстрого ответа
	 */
	resend () {
		this.clickWithRetry(this.locators.toolbar.resend);
	}
}

module.exports = MessagefastreplyPage;
