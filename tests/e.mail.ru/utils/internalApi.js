'use strict';

// const PROXY_PATH = 'http://localhost:8091';
const PROXY_PATH = 'http://test-proxy.win102.dev.mail.ru';
const request = require('request');
const signup = require('./user/signup');

/**
 * Makes request
 *
 * @param  {string} path
 * @param {string} method
 * @param {Object} body
 * @returns {Promise}
 */
const call = function ({path, method = 'GET', body = {}}) {
	let params = {
		url: `${PROXY_PATH}/${path}`,
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
			result.isOK = true;
			result.requestBody = body;

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
	},

	/**
	 * Verify phone number through internal-api
	 * @param  {string} email
	 * @param  {string} phone
	 * @returns {Promise}
	 */
	verifyPhone (email, phone) {
		return call({
			path: `test/user/phones/verify?email=${email}&phone=${phone}`
		});
	},

	/**
	 * Signup new user
	 *
	 * @param {Object} params
	 * {array | number} phones
	 * {object} restore
	 * @returns {Promise}
	 */
	userAdd (params) {
		return call({
			path: 'users/add',
			method: 'POST',
			body: signup.generateSignupData(params)
		});
	}
};
