'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let MessagePage = require('../../pages/message');

/** Модуль для работы с шагами страницы чтения письма */
class MessageSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new MessagePage();
	}
}

module.exports = MessageSteps;
