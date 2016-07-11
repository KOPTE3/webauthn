'use strict';

let AccountManager = require('@qa/account-manager');

/** Набор методов для работы с авторизационными данными */
module.exports = {
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
				.then(({ body }) => {
					if (process.NODE_DEBUG) {
						let border = '='.repeat(50);

						console.log('%s\nUsed credentials:\n', border);
						console.log('%s\n%s', JSON.stringify(body, null, '\t'), border);
					}

					return body;
				});
		});
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
