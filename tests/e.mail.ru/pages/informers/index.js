'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с информерами */
class InformersPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '',
			unsubscribe: '.b-informer .b-letter-unsubscribe'
		};
	}

	/**
	 * Проверяет видимость информера об отписке
	 * @param {boolean} reverse
	 * @returns {boolean}
	 */
	isUnsubscribeVisible (reverse) {
		return this.page.waitForVisible(this.locators.unsubscribe, 1000, reverse);
	}
}

module.exports = InformersPage;
