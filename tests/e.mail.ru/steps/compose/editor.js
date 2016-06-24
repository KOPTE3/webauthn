'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let login = require('../../pages/login');

/** Модуль для работы с шагами редактора страницы написания письма */
class Editor extends Steps {
	constructor () {
		super();
	}

	/**
	 * Дождаться появления редактора написания письма
	 */
	wait () {
		let actual = login.wait();

		assert(actual, 'Не удалось дождаться появления редактора написания письма');
	}
}

module.exports = new Editor();
