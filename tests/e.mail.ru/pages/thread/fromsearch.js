'use strict';

let PageObject = require('../../pages');

let ThreadPage = require('./');

/** Модуль для работы с представлением треда */
class ThreadFromsearch extends ThreadPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		const container = '#b-fromsearch-thread';

		return {
			container,
			letters: `${container} [data-letter-id]`
		};
	}
}

module.exports = ThreadFromsearch;
