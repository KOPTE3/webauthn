'use strict';

let AccountManager = require('@qa/account-manager');

/** @namespace browser */
/** Модуль для работы с данными */
class Store {
	/**
	 * Информация об аккаунте
	 *
	 * @param {Object} [options]
	 */
	session (options = {}) {
		let account = new AccountManager.Hooks();

		Object.assign(options, {
			host: browser.options.baseUrl
		});

		browser.waitUntil(function async () {
			return account.session(options)
				.then(result => true);
		});
	}

	/**
	 * Информация об аккаунте
	 *
	 * @type {Object}
	 */
	get account () {
		return new AccountManager.Session();
	}

	/*
	cookies (cookie) {
		cookie.qa = '77Gozo5bwoYF5Xned9Vns5dqh5WopOZQ';
	}
	*/

	/**
	 * Название браузера
	 *
	 * @type {string}
	 */
	get browser () {
		return browser.desiredCapabilities.browserName;
	}

	/**
	 * Название платформы
	 *
	 * @type {string}
	 */
	get platform () {
		let status = browser.status();

		return browser.desiredCapabilities.platform || status.value.os.name;
	}
}

module.exports = Store;
