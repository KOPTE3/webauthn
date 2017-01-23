'use strict';

let debug = require('debug')('@qa:yoda');
let AccountManager = require('@qa/account-manager');
let authStore = require('../store/authorization');
let providers = require('../store/authorization/providers');

/** Набор методов для аккаунтом пользователя */
/** @namespace browser */
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

			service = providers.find(host).name || host;
		}

		// Ставим куку только на хост, который указан в конфиге
		let host = browser.options.baseUrl;

		// Добавляем обязательные поля
		Object.assign(options, { host, type, service });

		browser.waitForPromise(() => {
			return account.session(options);
		}, 15 * 1000, 'Could not get user session');

		this.setCookie();
	},

	/**
	 * Регистрация нового ящика
	 *
	 * @param {string} [type] — тип авторизации
	 * Из-за отсутствия других реализаций пока не используется, но зарезервирован
	 * @param {Object} [options] — авторизационые данные
	 * @returns {Promise}
	 */
	register (type, options = {}) {
		let account = new AccountManager.Hooks();

		return browser.waitForPromise(() => {
			return account.register(options.domain || 'mail.ru', options);
		}, 15 * 1000, 'Could not register user');
	},

	/**
	 * Выставляет куки
	 */
	setCookie () {
		let { account } = authStore;

		browser.timeouts('page load', 30 * 1000);
		browser.url('/cgi-bin/lstatic');

		try {
			let cookie = account.get('cookie');

			if (!cookie.length) {
				throw new Error('COOKIE_NOT_FOUND');
			}

			browser.setCookies(cookie);
		} catch ({ stack, message }) {
			switch (message) {
				case 'COOKIE_NOT_FOUND':
					break;

				default:
					message =
						'Could not found cookie to continue\n\n' +
						'If you see this error message:\n' +
						'  — There\'s no cookie. Try again with --debug option to explore that.\n' +
						'  — The "auth" method is called in the wrong order.\n' +
						'  — There\'s unexpected behavior in using Mocha\'s API.\n' +
						'  — There\'s hidden exception. \n' +
						'Try again with --debug, --stack and --verbose options to explore that.\n';
					break;
			}

			throw new Error(`${message}\n\n${stack}`);
		}
	},

	/**
	 * Разлогин
	 *
	 * @param {string} email
	 * @param {number} timeout
	 */
	logout (email = '', timeout = 30 * 1000) {
		if (!email) {
			let { account } = authStore;

			email = account.get('email');
		}

		// В почте разлогинизация для активного пользователя
		// происходит без ajax запроса, открытием url в браузере,
		// а для неактивного с помощью ajax — повторяем это поведение
		if (this.isActiveUser(email)) {
			browser.url('https://auth.mail.ru/cgi-bin/logout');
		} else {
			try {
				browser.timeouts('script', timeout);

				browser.executeAsync(function (user, resolve) {
					if (window.__PH && window.__PH.logoutAccount) {
						window.__PH.logoutAccount(user, function (result) {
							resolve(result.status === 'ok');
						});
					}
				}, email);
			} catch (error) {
				throw new Error(`Could not logout user ${email}`);
			}
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
		if (!email) {
			let { account } = authStore;

			email = account.get('email');
		}

		try {
			browser.timeouts('script', timeout);

			return browser.executeAsync(function (user, resolve) {
				if (window.__PH) {
					if (window.__PH.activeUser() === user) {
						resolve(true);
					}
				}
			}, email);
		} catch (error) {
			throw new Error(`Could not detect user authorization ${email}`);
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
	}
};
