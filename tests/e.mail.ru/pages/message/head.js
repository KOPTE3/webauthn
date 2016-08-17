'use strict';

let MessagePage = require('../message');

/** Модуль для работы с телом письма */
class LetterHeadPage extends MessagePage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = `${super.locators.container} .b-letter__head__wrapper`;

		return this.extend(super.locators, {
			container,
			attaches: `${container} .b-letter__head__attach`
		});
	}

	/**
	 * Проверить, что в шапке есть ссылка на аттачи
	 *
	 * @return {boolean}
	 */
	hasAttaches () {
		return this.page.isExisting(this.locators.attaches);
	}
}

module.exports = LetterHeadPage;
