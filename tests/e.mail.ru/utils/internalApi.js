'use strict';

const PROXY_PATH = 'http://test-proxy.win102.dev.mail.ru/internal/';


/**
 * Модуль для работы с Internal API
 */
class API {


	/**
	 * Получение кода SMS по reg_token.id
	 * @param  {string} id
	 * @return {Object}
	 */
	static getSmsCode (id) {
		return {
			isOK: result.state === 'success',
			value: result.value
		};
	}
}

module.exports = API;
