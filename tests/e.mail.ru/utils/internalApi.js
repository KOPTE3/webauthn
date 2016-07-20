'use strict';

const PROXY_PATH = 'http://test-proxy.win102.dev.mail.ru';
const request = require('request');

/**
 * Makes requset
 * @param  {Object} opts
 * @returns {Promise}
 */
const call = function (opts) {
	return new Promise((resolve, reject) => {
		request.get(`${PROXY_PATH}/${opts.path}`, (error, response, httpBody) => {
			let result = {
				isOK: false,
				body: null
			};

			if (error) {
				result.body = error;

				return resolve(result);
			}

			try {
				result.body = JSON.parse(httpBody).body;
			} catch (error) {
				result.body = error;
			}

			result.isOK = true;

			resolve(result);
		});
	});
};


/**
 * Модуль для работы с Internal API
 */
module.exports = {

	/**
	 * Получение кода SMS по reg_token.id
	 * работает только для ящиков regtest{.*}@mail.ru
	 * @param  {string} email
	 * @param  {string} id
	 * @returns {Promise}
	 */
	getSmsCode (email, id) {
		return call({
			path: `sms/${email}/${id}`
		});
	}
};
