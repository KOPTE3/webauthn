'use strict';

let assert = require('assert');

let LetterHeadPage = require('../../pages/message/head');
let MessageSteps = require('../message');

/** Модуль для работы с телом письма */
class LetterHeadSteps extends MessageSteps {
	constructor () {
		super();
		this.headPage = new LetterHeadPage();
	}

	/**
	 * Проверить, что в шапке есть ссылка на аттачи
	 */
	hasAttaches () {
		let actual = this.headPage.hasAttaches();

		assert(actual, 'В шапке письма нет ссылки на аттачи');
	}

	/**
	 * Проверить, что в шапке есть нет ссылки на аттачи
	 */
	noAttaches () {
		let actual = !this.headPage.hasAttaches();

		assert(actual, 'В шапке письма нет ссылки на аттачи');
	}
}

module.exports = LetterHeadSteps;
