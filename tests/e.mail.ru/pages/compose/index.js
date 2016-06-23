'use strict';

let PageObject = require('../../pages');

class Login extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container: '.b-compose'
		};
	}

	open () {
		browser.url('/compose');

		return browser.waitForExist(this.locators.container);
	}
}

module.exports = new Login();
