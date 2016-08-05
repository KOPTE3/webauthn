'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let MessagesPage = require('../../pages/messages');

/** Модуль для работы с шагами страницы списка писем */
class MessagesSteps extends Steps {
	constructor () {
		super();

		this.messages = new MessagesPage();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new MessagesPage();
	}

	/**
	 * Переключить треды
	 *
	 * @see MessagesPage#toggleThreads
	 */
	toggleThreads (/** ... */) {
		this.messages.toggleThreads(...arguments);
	}
}

module.exports = MessagesSteps;
