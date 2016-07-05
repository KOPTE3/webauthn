'use strict';

let TestTools = require('@qa/test-tools');
let AccountManager = require('@qa/account-manager');
let AuthStore = require('../store/authorization');

class Support extends TestTools.Support {
	constructor () {
		super();

		this.authStore = new AuthStore();
	}

	/**
	 * Получение сессии
	 *
	 * @param {string} type — тип авторизации
	 * @param {Object} [options] — авторизационые данные
	 */
	session (type = 'basic', options = {}) {
		let account = new AccountManager.Hooks();

		Object.assign(options, {
			host: browser.options.baseUrl,
			type
		});

		browser.waitUntil(function async () {
			return account.session(options)
				.then(result => true);
		});

		this.setCookie();
	}

	/**
	 * Выставляет куки
	 */
	setCookie () {
		let { account } = this.authStore;

		browser.url('/login');

		try {
			let cookie = account.get('cookie');

			if (!cookie.length) {
				throw new Error();
			}

			browser.setCookies(cookie);
		} catch (error) {
			throw new Error('Could not found cookie to continue');
		}

		if (process.env.NODE_DEBUG) {
			let email = account.get('email');

			console.log(`Used ${email} account`);
		}
	}

	/**
	 * Проверяет залогинен ли пользователь
	 *
	 * @returns {boolean}
	 */
	isActiveUser () {
		try {
			let { account } = this.authStore;
			let email = account.get('email');

			return browser.waitUntil(function async () {
				return browser.executeAsync(function (user, resolve) {
					if (window.__PH) {
						if (window.__PH.activeUser() === user) {
							resolve(true);
						}
					}
				}, email);
			});
		} catch (error) {
			return false;
		}
	}
}

module.exports = Support;
