'use strict';

let MessagePage = require('../message');

/** Модуль для работы с телом письма */
class LetterAttachesPage extends MessagePage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = `${super.locators.container} .js-attachments-view`;

		return this.extend(super.locators, {
			container
		});
	}

	/**
	 * Проверить, что в письме есть аттачи
	 *
	 * @return {boolean}
	 */
	hasAttaches () {
		return this.page.isExisting(this.locators.container);
	}
}

module.exports = LetterAttachesPage;
