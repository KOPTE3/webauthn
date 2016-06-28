'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let MessagesPage = require('../../pages/messages');

/** Модуль для работы с шагами страницы списка писем */
class MessagesSteps extends Steps {
	constructor () {
		super();
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
	 *
	 * @static
	 * */
	static toCompose () {
		this.page.clickButton('compose');
	}

}


module.exports = MessagesSteps;
