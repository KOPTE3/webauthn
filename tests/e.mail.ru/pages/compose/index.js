'use strict';

let assert = require('assert');
let PageObject = require('../../pages');

class Login extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container: '.login-page__external'
		};
	}

	open () {
		browser.url('/compose');

		return browser.waitForExist(this.locators.container);
	}
}

module.exports = new Login();
