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
	 *
	 * @return {Promise}
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
	 * Отправляет пользователю письмо
	 *
	 * @param {string} to - адрес получателя
	 * @param {string} from - адрес отправителя
	 * @param {string} subject - тема письма
	 * @param {string} text - текст пиьсма
	 *
	 * @return {Promise}
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
	 * @return {Promise}
	 */
	createFolders (folders) {
		return this.call('folders/add', {
			folders
		});
	}
}

module.exports = new Actions();
