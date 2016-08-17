'use strict';

let assert = require('assert');

let LetterAttachesPage = require('../../pages/message/attaches');
let MessageSteps = require('../message');

/** Модуль для работы с телом письма */
class LetterAttachesSteps extends MessageSteps {
	constructor () {
		super();
		this.attachesPage = new LetterAttachesPage();
	}

	/**
	 * Проверить, что в шапке есть ссылка на аттачи
	 */
	hasAttaches () {
		let actual = this.attachesPage.hasAttaches();

		assert(actual, 'В письме нет аттачей');
	}

	/**
	 * Проверить, что в шапке есть нет ссылки на аттачи
	 */
	noAttaches () {
		let actual = !this.attachesPage.hasAttaches();

		assert(actual, 'В письме есть аттачи');
	}
}

module.exports = LetterAttachesSteps;
