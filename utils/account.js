'use strict';

let TestTools = require('@qa/test-tools');
let AccountManager = require('@qa/account-manager');
let authStore = require('../store/authorization');
let providers = require('../store/authorization/providers');

/** Набор методов для аккаунтом пользователя */
module.exports = {
	/**
	 * Получение сессии
	 *
	 * @param {string} type — тип авторизации
	 * @param {Object} [options] — авторизационые данные
	 */
	session (type = 'basic', options = {}) {
		let account = new AccountManager.Hooks(),
			service = 'mail.ru';

		if (/^(pdd|external)$/.test(type)) {
			type = 'basic';
		} else if (options.username) {
			let { name, host } = this.parseEmail(options.username);

			service = providers.find(host);
		}

		// Ставим куку только на хост, который указан в конфиге
		let host = browser.options.baseUrl;

		// Добавляем обязательные поля
		Object.assign(options, { host, type, service });

		browser.waitUntil(function async () {
			return account.session(options)
				.then(result => true);
		}, 15 * 1000, 'Could not get user session');

		this.setCookie();
	},

	/**
	 * Выставляет куки
	 */
	setCookie () {
		let { account } = authStore;

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

		if (process.NODE_DEBUG) {
			let email = account.get('email');

			console.log(`%s\nUsed ${email} account\n%s`, '='.repeat(50));
		}
	},

	/**
	 * Проверяет залогинен ли пользователь
	 *
	 * @param {string} [email]
	 * @param {number} [timeout]
	 * @returns {boolean}
	 */
	isActiveUser (email = '', timeout = 30 * 1000) {
		try {
			if (!email) {
				let { account } = authStore;

				email = account.get('email');
			}

			return browser.waitUntil(function async () {
				return browser.executeAsync(function (user, resolve) {
					if (window.__PH) {
						if (window.__PH.activeUser() === user) {
							resolve(true);
						}
					}
				}, email);
			}, timeout, `Could not detect user authorization ${email}`);
		} catch (error) {
			return false;
		}
	},

	/**
	 * Позволяет определить тип аккаунта
	 *
	 * @param {string} provider
	 * @param {string} type
	 * Допустимые значения: [internal, external, pdd, oauth]
	 * @returns {boolean}
	 */
	hasAccountType (provider, type) {
		let result = providers.filter(({ hosts, types }) => {
			return hosts.includes(provider) && types.includes(type);
		});

		return result.length > 0;
	},

	/**
	 * Позволяет получить состовляющие email
	 *
	 * @param {string} email
	 * @returns {Object}
	 */
	parseEmail (email) {
		try {
			let [, name, host] = email.match(/(.*)@(.{4,})$/);

			return { name, host };
		} catch (error) {
			throw new Error(`Could not parse passed email "${email}"\n${error.stack}`);
		}
	},

	generatePassword (length = 10) {
		let symbols = '0123456789' +
			'abcdefghiklmnopqrstuvwxyz' +
			'ABCDEFGHIJKLMNOPQRSTUVWXTZ' +
			'!@#$%^&*()-_+=;:,./?\\|`~[]{}';

		let randomItems = (array, length) => {
			return Array.from({length}, () => {
				return array[Math.floor(Math.random() * array.length)];
			});
		};

		return randomItems(symbols, length).join('');
	}
};
