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
	 * @returns {Object}
	 */
	credentials (type = 'basic') {
		let account = new AccountManager();

		return account.credentials({ type });
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
