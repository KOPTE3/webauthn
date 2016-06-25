'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/folders');

/** Модуль для работы с шагами списка папкок */
class Folders extends Steps {
	constructor () {
		super();
	}

	/**
	 * Дождаться появления списка папкок
	 *
	 */
	wait () {
		let actual = compose.wait();

		assert(actual, 'Не дождаться показа списка папок');
	}
}

module.exports = new Folders();
