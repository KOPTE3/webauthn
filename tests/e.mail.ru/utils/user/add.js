'use strict';

let debug = require('debug')('useradd');

let API = require('../internalApi');
let phonesStore = require('../../store/phones');

module.exports = {
	userPrepare (params) {
		let {login, domain, password, phones = [], restore = null} = params;

		return {
			email: `${login}@${domain}`,
			phones: phonesStore.getPhones(phones),
			restore,
			password
		};
	},

	userAdd (params) {
		return API.userAdd(params).then(data => {
			let result = {
				isOK: true,
				data: data.requestBody,
				body: data.body
			};

			if (!data.isOK || !Array.isArray(data.body)) {
				result.isOK = false;
			}

			if (data.isOK) {
				result.data = this.userPrepare(result.data);
			}

			debug('user/add request: ', JSON.stringify(data.requestBody));
			debug('user/add response: ', JSON.stringify(result.body));
			debug('user/add status: ', result.isOK);

			return result;
		}, error => {
			throw new Error(error);
		});
	}
};
