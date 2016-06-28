'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let ThreadPage = require('../../pages/thread');

/** Модуль для работы с шагами страницы треда */
class ThreadSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new ThreadPage();
	}
}

module.exports = ThreadSteps;
