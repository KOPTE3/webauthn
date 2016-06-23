'use strict';

let AccountManager = require('@qa/account-manager');

class Store {
	get account () {
		return new AccountManager.Session();
	}
}

module.exports = Store;
