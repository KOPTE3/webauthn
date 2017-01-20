'use strict';

let debug = require('debug')('@qa:yoda');
let AccountManager = require('@qa/account-manager');

let account = new AccountManager();

/** Набор методов для работы с авторизационными данными */
module.exports = {
	/** Пароль, который следует использовать */
	password: 'YTgh763',

	/**
	 * Возвращает авторизационные данные указанного типа
	 *
	 * @see discard — обязательно вызываейте этот метод для осовобождения
	 * занимаемого аккаунта!
	 * @param {string} type — тип авторизации
	 * @param {Object} [options] — дополнительные опции
	 * @param {number} [timeout] — максимальное время ожидания
	 * @returns {Object}
	 *
	 * Данные, которые возвращаются:
	 *
	 * {
	 *    id, login, password, domain, first_name,
	 *    user_agent, sex, last_name
	 * }
	 */
	credentials (type = 'basic', options = { }, timeout) {
		options = Object.assign({ domain: 'mail.ru', type }, options);

		return browser.waitForPromise(() => {
			return account.credentials(options)
				.then(({ body }) => {
					debug('Used credentials:\n%o', body);

					return body;
				})
				.catch(({ message }) => {
					throw new Error(`Could not get user credentials:\n\t${message}`);
				});
		}, timeout, 'Could not get user credentials');
	},

	/**
	 * Освободить и сбросить состояние аккаунта
	 *
	 * @param {number} id — идентификатор учетной записи
	 * @returns {Promise}
	 */
	discard (id) {
		return account.discard(id);
	},

	/**
	 * Получение авторизационных сведений о текущем аккаунте
	 *
	 * @type {Object}
	 */
	get account () {
		return new AccountManager.Session();
	}
};
