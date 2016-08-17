'use strict';

let assert = require('assert');

let LetterBodyPage = require('../../pages/message/body');
let MessageSteps = require('../message');

/** Модуль для работы с телом письма */
class LetterBodySteps extends MessageSteps {
	constructor () {
		super();
		this.bodyPage = new LetterBodyPage();
	}

	/**
	 * Кликнуть по ссылке в письме
	 *
	 * @param {string} link - текст ссылки (не урл)
	 */
	clickLink (link) {
		this.bodyPage.clickLink(link);
	}

	/**
	 * Проверить, что в письме есть инлайны
	 */
	hasInline () {
		let actual = this.bodyPage.hasInline();

		assert(actual, 'В письме нет инлайнов');
	}
}

module.exports = LetterBodySteps;
