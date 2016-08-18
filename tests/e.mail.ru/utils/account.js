'use strict';

let password = require('zxcvbn');
let debug = require('debug')('yoda');

let TestTools = require('@qa/test-tools');
let AccountManager = require('@qa/account-manager');
let authStore = require('../store/authorization');
let providers = require('../store/authorization/providers');
let passwords = require('../store/authorization/passwords');

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

		// Пробуем авторизовать указанным адресом
		if (options.username) {
			let { name, host } = this.parseEmail(options.username);

			service = providers.find(host);
		}

		// Ставим куку только на хост, который указан в конфиге
		let host = browser.options.baseUrl;

		// Добавляет обязательные поля
		Object.assign(options, { host, type, service });

		let message = JSON.stringify(options, null, '\t');

		browser.waitUntil(function async () {
			return account.session(options)
				.then(result => true);
		}, 15 * 1000, `Could not get user session\n\t${message}`);

		try {
			this.setCookie();
		} catch (error) {
			throw new Error(`Could not found cookie to continue:\n\t${message}`);
		}
	},

	/**
	 * Выставляет куки
	 */
	setCookie () {
		let { account } = authStore;

		browser.url('/login');

		let cookie = account.get('cookie');

		if (!cookie.length) {
			throw new Error();
		}

		browser.setCookies(cookie);

		debug(`Used account is %s`, account.get('email'));
		debug(`Used cookie is %j`, cookie);
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

	/**
	 * Позволяет получить пароль с заданными характеристиками
	 *
	 * @param {number} length — требуемое количество символов
	 * @param {boolean} local — использовать предопределенные пароли
	 * @returns {string}
	 */
	generatePassword (length = 10, local) {
		if (local) {
			return passwords.get(2);
		}

		let symbols = '0123456789' +
			'abcdefghiklmnopqrstuvwxyz' +
			'ABCDEFGHIJKLMNOPQRSTUVWXTZ' +
			'!@#$%^&*()-_+=;:,./?\\|`~[]{}';

		let randomItems = (array, length) => {
			return Array.from({ length }, () => {
				return array[Math.floor(Math.random() * array.length)];
			});
		};

		return randomItems(symbols, length).join('');
	},

	/**
	 * Позволяет определить сложность пароля
	 *
	 * @param {string} password
	 * @param {Array} credentials — данные, которые следует учитывать при проверке пароля
	 * @returns {Object}
	 */
	passwordStrength: password
};
