'use strict';

let assert = require('assert');

let BodyPage = require('../../pages/message/body');
let MessageSteps = require('../message');

/** Модуль для работы с телом письма */
class BodySteps extends MessageSteps {
	constructor () {
		super();
		this.bodyPage = new BodyPage();
	}

	/**
	 * Кликнуть по ссылке в письме
	 *
	 * @param {string} link - текст ссылки (не урл)
	 */
	clickLink (link) {
		this.bodyPage.clickLink(link);
	}
}

module.exports = BodySteps;
