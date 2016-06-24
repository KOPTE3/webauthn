'use strict';

let AccountManager = require('@qa/account-manager');

/** Модуль для работы с данными */
class Store {
	/**
	 * Информация об аккаунте
	 *
	 * @type {Object}
	 */
	get account () {
		return new AccountManager.Session();
	}

	get files () {
		if (browser) {

		}

		return '/var/lib/selenium/Dropbox/feta/mail';
	}
}

module.exports = Store;
