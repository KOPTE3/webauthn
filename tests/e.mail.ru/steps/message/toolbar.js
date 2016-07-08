'use strict';

let assert = require('assert');

let MessageToolbarPage = require('../../pages/message/toolbar');
let MessageSteps = require('../message');

/** Модуль для работы с формой страницы написания письма */
class MessageToolbarSteps extends MessageSteps {
	constructor () {
		super();
		this.toolbarPage = new MessageToolbarPage();
	}

	/**
	 * Нажать на кнопку тулбара
	 *
	 * @param {string} name - имя кнопки, по которой нужно нажать
	 * доступные значения (replyAll, reply, forward, remove, archive, spam);
	 */
	clickButton (name) {
		this.toolbarPage.clickButton(name);
	}

}

module.exports = MessageToolbarSteps;
