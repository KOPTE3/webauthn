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
		request.get(`${PROXY_PATH}/${opts.path}`, (error, response, body) => {
			if (error) {
				return reject(error);
			}

			resolve(body);
		});
	});
};


/**
 * Модуль для работы с Internal API
 */
class API {

	/**
	 * Получение кода SMS по reg_token.id
	 * @param  {string} email
	 * @param  {string} id
	 * @returns {Promise}
	 */
	static getSmsCode (email, id) {
		return call({
			path: `sms/${email}/${id}`
		});
	}
}

module.exports = API;
