'use strict';

let Steps = require('../../steps');
let login = require('../../pages/login');

class Compose extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу написания письма
	 */
	open () {
		let actual = login.open();

		assert(actual, 'Не удалось открыть страницу написания письма');
	}
}

module.exports = new Сompose();
