'use strict';

let Steps = require('../../steps');
let login = require('../../pages/login');

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
