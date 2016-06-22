'use strict';

let AccountManager = require('@qa/account-manager');

class PageObject {
	constructor () {
		this.account = new AccountManager.Session();
	}

	open (path) {
		browser.url(path);
	}

	auth (type) {
		let cookie = this.account.get('cookies', type);

		browser.url('/');
		browser.setCookies(cookie);
	}
}

module.exports = PageObject;
