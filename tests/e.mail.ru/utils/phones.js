'use strict';

let ajax = require('./ajax');
let API = require('./internalApi');

/**
 * Модуль для работы с телефонами Mail.Ru
 */
module.exports = {

	/**
	 * Записываем user/password/restore ответы
	 * @returns {Object}
	 */
	registerPassrestoreLogger () {
		return ajax.registerLogger('user/password/restore');
	},

	/**
	 * Получение последнего reg_token ID восстановления пароля
	 * @returns {string|null}
	 */
	getLastPassremindRegTokenId () {
		let result = ajax.getLoggerInfo('user/password/restore');

		if (result.isOK) {
			let results = result.value,
				xhr = results[results.length - 1].xhr,
				response = JSON.parse(xhr.responseText);

			return response.body.id;
		}

		return null;
	},

	/**
	 * Get SMS code from internal-api
	 * @param  {string} email
	 * @param  {string} id
	 * @returns {Promise}
	 */
	getSmsCodeValue (email, id) {
		return API.getSmsCode(email, id).then(data => {
			return data;
		}, error => {
			throw new Error(error);
		});
	}
};