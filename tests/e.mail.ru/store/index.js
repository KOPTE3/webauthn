'use strict';

let AccountManager = require('@qa/account-manager');

/** @namespace browser */
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

	cookies (cookie) {
		cookie.qa = '77Gozo5bwoYF5Xned9Vns5dqh5WopOZQ';
	}

	/**
	 * Название платформы
	 *
	 * @type {string}
	 */
	get platform () {
		return browser.desiredCapabilities.platform ||
			browser.execute('window.navigator.platform').value;
	}
}

module.exports = Store;
