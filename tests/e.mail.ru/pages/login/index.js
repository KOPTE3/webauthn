'use strict';

let assert = require('assert');
let PageObject = require('../page');

class Login extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container: '.login-page__external'
		}
	}

	open () {
		browser.url('/login');

		return browser.waitForExist(this.locators.container);
	}
}

module.exports = new Login();
