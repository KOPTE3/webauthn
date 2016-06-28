'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let SentPage = require('../../pages/sent');

/** Модуль для работы с шагами страницы отправленного письма */
class SentSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new SentPage();
	}
}

module.exports = SentSteps;
