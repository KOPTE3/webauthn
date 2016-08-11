'use strict';

let PageObject = require('../../pages');

class NotifyPage extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container: '.notify',
			ok: '.notify-message__title__text_ok',
			error: '.notify-message__title__text_error'
		};
	}

	getNotify (type) {
		const locator = `${this.locators.container} ${this.locators[type]}`;

		this.page.waitForExist(locator);

		return this.page.element(locator);
	}
}

module.exports = NotifyPage;
