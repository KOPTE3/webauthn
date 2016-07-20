'use strict';

let AccountManager = require('@qa/account-manager');

let account = new AccountManager();

/** Набор методов для работы с авторизационными данными */
module.exports = {
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

		return browser.waitUntil(function async () {
			return account.credentials(options)
				.then(({ body }) => {
					if (process.NODE_DEBUG) {
						let border = '='.repeat(50);

						console.log('%s\nUsed credentials:\n', border);
						console.log('%s\n%s', JSON.stringify(body, null, '\t'), border);
					}

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
