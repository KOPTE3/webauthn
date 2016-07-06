'use strict';

let assert = require('assert');

let Steps = require('../../../steps');
let MessagesPage = require('../../../pages/settings/messages');

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

}


module.exports = MessagesSteps;
