'use strict';

let LettersPage = require('../messages/letters');

/** Модуль для работы с письмами в результатах поиска */
class SearchLettersPage extends LettersPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let active = 'div:not([style *= "none"])>';

		const container = '.b-datalist_search';

		return this.extend(super.locators, {
			container,
			letter: `${container} .b-datalist__item .b-datalist__item__link`,
			unreadLetter: `${container} .b-datalist__item_unread .b-datalist__item__link`,
			newestLetter: `${container} .b-datalist__item__link`
		});
	}

}

module.exports = SearchLettersPage;
