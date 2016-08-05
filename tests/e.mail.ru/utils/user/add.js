'use strict';

let debug = require('debug')('useradd');

let API = require('../internalApi');
let userInfo = require('./info');
let phonesStore = require('../../store/phones');

/**
 * Signup new user
 * @see http://api.tornado.dev.mail.ru/users/add
 *
 * @param {Object} params
 *         data for a single user according to api
 *
 * @returns {Promise}
 *          {Object} result
 *                   isOK - response status
 *                   value - extended user data
 */
module.exports = (params) => {
	let user = userInfo.generateUserData(params);
	let {login, domain, phones = []} = user;

	let userData = Object.assign({}, user, {
		email: `${login}@${domain}`,
		phones: phonesStore.getPhones(phones)
	});

	let request = API.call({
		path: 'users/add',
		method: 'POST',
		body: user
	});

	return request.then(data => {
		let result = {
			isOK () {
				return data.isOK && Array.isArray(data.body);
			},
			value: userData
		};

		debug('users/add request: ', data.requestBody);
		debug('users/add response: ', data.body);
		debug('users/add status: ', data.isOK);

		return result;
	}, error => {
		throw new Error(error);
	});
};
