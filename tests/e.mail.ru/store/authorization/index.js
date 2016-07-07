'use strict';

let AccountManager = require('@qa/account-manager');
let Store = require('../../store');

/** Модуль для работы с авторизационными данными */
class AuthStore extends Store {
	constructor () {
		super();
	}

	/**
	 * Возвращает авторизационные данные указанного типа
	 *
	 * @param {string} type — тип авторизации
	 * @param {Object} [options] — дополнительные опции
	 * @returns {Object}
	 *
	 * Данные, которые возвращаются:
	 *
	 * {
	 *    id, login, password, domain, first_name,
	 *    user_agent, sex, last_name
	 * }
	 */
	credentials (type = 'basic', options = {}) {
		let account = new AccountManager();

		Object.assign(options, { type });

		return browser.waitUntil(function async () {
			return account.credentials(options)
				.then(({ body }) => body);
		});
	}

	/**
	 * Получение авторизационных сведений о текущем аккаунте
	 *
	 * @type {Object}
	 */
	get account () {
		return new AccountManager.Session();
	}
}

module.exports = AuthStore;
