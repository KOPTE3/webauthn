'use strict';

let PassrestoreSelectPage = require('../passrestore/select');

/** Модуль для работы со страницей на восстановлении доступа (mrim) */
class AccessViewPage extends PassrestoreSelectPage {
	constructor () {
		super();
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			container: '.js-view-access-type'
		});
	}
}

module.exports = AccessViewPage;
