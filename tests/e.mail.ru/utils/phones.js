'use strict';

let ajax = require('./ajax');

/**
 * Модуль для работы с телефонами Mail.Ru
 */
class Phones {

	/**
	 * Записываем user/password/restore ответы
	 * @return {Object}
	 */
	static registerPassrestoreLogger () {
		return ajax.registerLogger('user/password/restore');
	}

	/**
	 * Получение последнего reg_token ID восстановления пароля
	 * @return {string|null}
	 */
	static getLastPassremindRegTokenId () {
		let result = ajax.getLoggerInfo('user/password/restore');

		if (result.isOK) {
			let results = result.value,
				xhr = results[results.length - 1].xhr,
				response = JSON.parse(xhr.responseText);

			return response.body.id;
		}

		return null;
	}
}

module.exports = Phones;
