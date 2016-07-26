'use strict';

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

			return result;
		}, err => {
			throw new Error(err);
		});
	}
};
