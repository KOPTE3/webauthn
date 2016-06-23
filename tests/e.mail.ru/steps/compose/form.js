'use strict';

let Steps = require('../../steps');
let login = require('../../pages/login');

class Form extends Steps {
	constructor () {
		super();
	}

	/**
	 * Дождаться появления формы написания письма
	 */
	wait () {
		let actual = login.wait();

		assert(actual, 'Не удалось открыть форму написания письма');
	}
}

module.exports = new Form();
