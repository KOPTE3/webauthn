'use strict';

let authStore = require('../store/authorization');

const ASYNC_TIMEOUT = 10000; // таймаут завершнеия асинхронного скрипта
const DELIVERY_TIMEOUT = 1000; // таймаут ожидания фактической доствки письма

/** Модуль для работы с Actions */
module.exports = {
	/**
	 * Выполняет апи вызов
	 *
	 * @param {string} method - имя вызываемого метоа
	 * @param {options} options - параметры передаваемы в вызов
	 * @returns {Promise}
	 */
	call (method, options) {
		/* eslint max-nested-callbacks: ["error", 4] */

		let email = authStore.account.get('email');

		return browser
			.timeoutsAsyncScript(ASYNC_TIMEOUT)
			.executeAsync(function (params, ASYNC_TIMEOUT, DELIVERY_TIMEOUT, resolve) {
				require(['RPC'], function (RPC) {
					(function () { // RPC setup
						RPC.setup({
							version: 1,
							baseUrl: '//' + window.location.hostname + '/api',
							email: params.email,
							timeout: ASYNC_TIMEOUT
						});

						RPC.serialize = function (data) {
							for (var field in data) {
								if ({}.hasOwnProperty.call(data, field)) {
									if (typeof data[field] === 'object') {
										data[field] = JSON.stringify(data[field]);
									}
								}
							}

							return data;
						};

						return new Promise(function (resolve) {
							if (window.mailru_api_token) {
								RPC.setup('token', window.mailru_api_token);
								resolve();
							} else {
								RPC.token().then(resolve);
							}
						});
					}()).then(function () {
						RPC
							.call(params.method, params.options)
							.always(function (res) {
								// дожидаемся фактической доставки сообщения
								setTimeout(function () {
									resolve(res.body);
								}, DELIVERY_TIMEOUT);
							});
					});
				});
			}, { email, method, options }, ASYNC_TIMEOUT, DELIVERY_TIMEOUT);
	},

	/**
	 * Отправляет пользователю письмо
	 *
	 * @param {string} to - адрес получателя
	 * @param {string} from - адрес отправителя
	 * @param {string} subject - тема письма
	 * @param {string} text - текст пиьсма
	 * @returns {Promise}
	 */
	sendMessage (to, from, subject, text) {
		const id = 'CqHSB5oZVN38ZCG9i0yvbi8gElq5I5G7';

		return this.call('messages/send', {
			id,
			from,
			subject,
			body: { text },
			correspondents: { to }
		});
	},

	/**
	 * Обновляет хелпер
	 *
	 * @param {number} index - индекс хелпера
	 * @param {Object} data - данные
	 *
	 * @returns {Promise}
	 */
	helperUpdate (index, data) {
		return this.call('helpers/update', {
			index,
			update: data
		});
	},

	/**
	 * Расхлопывает папку
	 *
	 * @param {Array} ids - идентификаторы папок
	 *
	 * @returns {Promise}
	 */
	expandFolders (ids) {
		return this.call('folders/expand', {
			ids,
			folder_update_period: 1
		});
	},

	/**
	 * Схлопывает папку
	 *
	 * @param {Array} ids - идентификаторы папок
	 *
	 * @returns {Promise}
	 */
	collapseFolders (ids) {
		return this.call('folders/collapse', {
			ids
		});
	},

	/**
	 * Создаёт папки
	 *
	 * @param {*[]} folders - папки
	 *
	 * @returns {Promise}
	 */
	createFolders (folders) {
		return this.call('folders/add', {
			folders
		});
	},

	/**
	 * Редактирует папки
	 *
	 * @param {*[]} folders - папки
	 *
	 * @returns {Promise}
	 */
	editFolders (folders) {
		return this.call('folders/edit', {
			folders
		});
	},

	/**
	 * Пометка писем
	 *
	 * @param {string} name - unread|flagged|pinned
	 * @param {string[]} ids - массив id писем
	 * @param {boolean} unset - снятие пометки
	 *
	 * @returns {Promise}
	 */
	markAs (name, ids, unset = false) {
		let key = unset ? 'unset' : 'set';

		return this.call('messages/marks', {
			marks: [
				{
					name,
					[key] : ids
				}
			]
		});
	}
};
