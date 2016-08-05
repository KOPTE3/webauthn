'use strict';

let debug = require('debug')('useredit');

let API = require('../internalApi');

/**
 * Edit user info
 * @see http://api.tornado.dev.mail.ru/users/edit
 *
 * @param {Object} params
 *         data for a single user according to api
 *         required fields: login, domain
 *
 * @returns {Promise}
 *          {Object} result
 *                   isOK - response status
 *                   data - user id
 */
module.exports = (params) => {
	return API.call({
		path: 'users/edit',
		method: 'POST',
		body: params
	}).then(data => {
		let result = {
			isOK () {
				return data.isOK && data.body === '';
			}
		};

		debug('users/edit request: ', data.requestBody);
		debug('users/edit response: ', data.body);
		debug('users/edit status: ', data.isOK);

		return result;
	}, error => {
		throw new Error(error);
	});
};
