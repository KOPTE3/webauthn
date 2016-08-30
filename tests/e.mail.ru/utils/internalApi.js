'use strict';

const request = require('request');
const PROXY_PATH = 'http://test-proxy.win102.dev.mail.ru';


/**
 * Makes request
 *
 * @param  {string} path
 * @param {string} method ('GET' | 'POST')
 * @param {Object} body
 * @returns {Promise}
 */

/**
 * Модуль для работы с Internal API
 */
module.exports = {
	call ({path, method = 'GET', body = {}}) {
		let params = {
			url: `${PROXY_PATH}/${path}?apihost=farm`,
			method,
			body,
			json: true
		};

		return new Promise((resolve, reject) => {
			request(params, (error, response, httpBody) => {
				let result = {
					isOK: false,
					body: null
				};

				if (error) {
					result.body = error;

					return resolve(result);
				}

				result.body = httpBody.body;
				result.isOK = httpBody.status === 200;
				result.status = httpBody.status;
				result.requestBody = body;

				resolve(result);
			});
		});
	},

	/**
	 * Получение кода SMS по reg_token.id
	 * работает только для ящиков regtest{.*}@mail.ru
	 * @param  {string} email
	 * @param  {string} id
	 * @returns {Promise}
	 */
	getSmsCode (email, id) {
		return this.call({
			path: `sms/${email}/${id}`
		});
	},

	/**
	 * Verify phone number through internal-api
	 * @param  {string} email
	 * @param  {string} phone
	 * @returns {Promise}
	 */
	verifyPhone (email, phone) {
		return this.call({
			path: `test/user/phones/verify?email=${email}&phone=${phone}`
		});
	}
};
