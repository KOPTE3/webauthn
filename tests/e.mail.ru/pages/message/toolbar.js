'use strict';

let MessagePage = require('../message');

/** Модуль для работы с формой страницы написания письма */
class MessageToolbar extends MessagePage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let toolbar = '[data-mnemo="toolbar-letter"]';
		let fatsreply = '[data-mnemo="toolbar-fastreply"]';

		return this.extend(super.locators, {
			toolbar: '',
			buttons: {
				replyAll: `${toolbar} [data-name="replyAll"]`,
				reply:  `${toolbar} [data-name="reply"]`,
				forward:  `${toolbar} .b-toolbar__btn[data-name="forward"]`,
				remove:  `${toolbar} [data-name="remove"]`,
				archive:  `${toolbar} [data-name="archive"]`,
				spam:  `${toolbar} [data-name="spam"]`
			},
			fastreply: {
				replyAll: `${fatsreply} [data-mnemo="send-all"]`,
				saveDraft: `${fatsreply} [data-name="saveDraft"]`,
				resend: `${fatsreply} [data-mnemo="resend"]`,
				cancel: `${fatsreply} [data-name="cancel"]`
			}
		});
	}

	/**
	 * Нажать на кнопку тулбара
	 *
	 * @param {string} name - имя кнопки, по которой нужно нажать
	 * доступные значения (send, replyAll, reply, forward, remove, archive, spam);
	 */
	clickButton (name) {
		this.clickAll(this.locators.buttons[name]);
	}

	/**
	 * Нажать на кнопку из тулбара быстрого ответа
	 *
	 * @param {string} name - имя кнопки, по которой нужно нажать
	 * доступные значения (replyAll, saveDraft, resend);
	 */
	clickFastreplyButton (name) {
		this.clickAll(this.locators.fastreply[name]);
	}

}

module.exports = MessageToolbar;
