'use strict';

const ASYNC_TIMEOUT = 10000; // таймаут завершнеия асинхронного скрипта
const DELIVERY_TIMEOUT = 1000; // таймаут ожидания фактической доствки письма

/** Модуль для работы с Actions */
class Actions {

	/**
	 * Выполняет апи вызов
	 *
	 * @param {string} method - имя вызываемого метоа
	 * @param {options} options - параметры передаваемы в вызов
	 * @returns {Promise}
	 */
	call (method, options) {
		/* eslint max-nested-callbacks: ["error", 4] */
		return browser
			.timeoutsAsyncScript(ASYNC_TIMEOUT)
			.executeAsync(function (method, options,
				ASYNC_TIMEOUT, DELIVERY_TIMEOUT, done) {
				require(['RPC'], function (RPC) {
					RPC.setup({
						version: 1,
						baseUrl: 'https://' + location.hostname + '/api',
						token: window.mailru_api_token,
						email: patron.useremail,
						timeout: ASYNC_TIMEOUT
					});

					RPC
						.call(method, options)
						.always(res => {
							// дожидаемся фактической доставки сообщения
							setTimeout(() => {
								done(res.body);
							}, DELIVERY_TIMEOUT);
						});
				});
			}, method, options, ASYNC_TIMEOUT, DELIVERY_TIMEOUT);
	}

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
	}

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
	}

	/**
	 * Регистрирует в браузере функцию-обработчик AJAX-ответа.
	 *
	 * @param {mixed} urlPattern Шаблон для проверки URL
	 * @param {function} hook функция-обработчик, принимает 2 парметра (xhr и options),
	 * в которые можно внести изменения
	 * @returns {Promise}
	 */
	registerAjaxHook (urlPattern, hook) {
		let result = browser
			.timeoutsAsyncScript(ASYNC_TIMEOUT)
			.executeAsync((urlPattern, hookString, done) => {
				let originalParse = window.patron.OfflineCache.parse;

				window.patron.OfflineCache.parse = function (jqXHR, textStatus, opts, doResult) {
					if (o.url.match(new RegExp(urlPattern))) {
						var body = '(' + hookString + ')(xhr, options)';

						/* eslint no-new-func: 0 */
						(new Function('xhr', 'options', body))(jqXHR, opts);
					}

					return originalParse.call(this, jqXHR, textStatus, opts, doResult);
				};

				done();
			}, urlPattern, hook.toString());

		return (result.state === 'success') && result.value;
	}

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
	}

	/**
	 * Создаёт папки
	 *
	 * @param {array} folders - папки
	 *
	 * @returns {Promise}
	 */
	createFolders (folders) {
		return this.call('folders/add', {
			folders
		});
	}
}

module.exports = new Actions();
