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
		let toolbar =
			'#LEGO>div:not([style *= "hidden"]) div:not([style *= "none"])>' +
			'div[data-uniqid]:not([style *= "none"])>.b-toolbar[data-mnemo]';

		let fatsreply = '[data-mnemo="toolbar-fastreply"]';

		return this.extend(super.locators, {
			toolbar: '',
			buttons: {
				replyAll: `${toolbar} [data-name="replyAll"]`,
				reply:  `${toolbar} [data-name="reply"]`,
				forward:  `${toolbar} [data-name="forward"]`,
				remove:  `${toolbar} [data-name="remove"]`,
				archive:  `${toolbar} [data-name="archive"]`,
				spam:  `${toolbar} [data-name="spam"]`
			},
			fastreply: {
				replyAll: `${toolbar} [data-mnemo="send-all"]`,
				saveDraft: `${toolbar} [data-name="saveDraft"]`,
				resend: `${toolbar} [data-mnemo="resend"]`
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
		this.clickWithRetry(this.locators.buttons[name]);
	}

	/**
	 * Нажать на кнопку из тулбара быстрого ответа
	 *
	 * @param {string} name - имя кнопки, по которой нужно нажать
	 * доступные значения (replyAll, saveDraft, resend);
	 */
	clickFastreplyButton (name) {
		this.clickWithRetry(this.locators.fastreply[name]);
	}

}

module.exports = MessageToolbar;
