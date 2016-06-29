'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let ThreadsPage = require('../../pages/threads');

/** Модуль для работы с шагами страницы списка тредов */
class ThreadsSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new ThreadsPage();
	}
}

module.exports = ThreadsSteps;
