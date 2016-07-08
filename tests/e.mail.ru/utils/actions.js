'use strict';

let AuthStore = require('../store/authorization');

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

		let authStore = new AuthStore();
		let email = authStore.account.get('email');

		return browser
			.timeoutsAsyncScript(ASYNC_TIMEOUT)
			.executeAsync(function (params,
				ASYNC_TIMEOUT, DELIVERY_TIMEOUT, done) {
				require(['RPC'], function (RPC) {
					(function () { // RPC setup
						RPC.setup({
							version: 1,
							baseUrl: '//' + location.hostname + '/api',
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
									done(res.body);
								}, DELIVERY_TIMEOUT);
							});
					});
				});
			}, {email, method, options}, ASYNC_TIMEOUT, DELIVERY_TIMEOUT);
	},

	/**
	 * Сохраняет данные в хелпере.
	 *
	 * @param {number} index
	 * @param {number} data
	 * @returns {Promise}
	 */
	updateHelper (index, data) {
		return this.call('helpers/update', {
			index,
			update: data
		});
	},

	/**
	 * Удаляет хелпер.
	 *
	 * @param {number} index
	 * @returns {Promise}
	 */
	removeHelper (index) {
		return this.call('helpers/remove', {
			indexes: [index]
		});
	},

	/**
	 * Регистрирует в браузере функцию-обработчик AJAX-ответов.
	 *
	 * @param {mixed} urlPattern Шаблон для проверки URL
	 * @param {Function} hook функция-обработчик, принимает 2 парметра (xhr и options),
	 * в которые можно внести изменения
	 * @returns {Promise}
	 */
	registerAjaxHook (urlPattern, hook, ...data) {
		let result = browser
			.execute(function (urlPattern, hookString, data) {
				var originalParse = window.patron.OfflineCache.parse;
				var hookBody = '(' + hookString + ').apply(null, [xhr, options].concat(data))';

				/* eslint no-new-func: 0 */
				var hook = new Function('xhr', 'options', 'data', hookBody);

				patron.OfflineCache.parse = function (jqXHR, textStatus, options, doResult) {
					if (options.url.match(new RegExp(urlPattern))) {
						hook(jqXHR, options, data);
					}

					return originalParse.call(this, jqXHR, textStatus, options, doResult);
				};
			}, urlPattern, hook.toString(), data);

		return (result.state === 'success') && result.value;
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

	editFolders (folders) {
		return this.call('folders/edit', {
			folders
		});
	},

	deleteFolders (ids) {
		return this.call('folders/remove', {
			ids
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
