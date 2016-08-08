'use strict';

let ajax = require('./ajax');
let API = require('./internalApi');

/**
 * Модуль для работы с телефонами Mail.Ru
 */
module.exports = {
	/**
	 * Звписываем ajax для получения reg_token.id
	 * @param {string} url
	 * @returns {Object}
	 */
	initRegTokenIdLog (url) {
		return ajax.registerLogger('complete', url);
	},

	/**
	 * Получение последнего reg_token ID восстановления пароля
	 * @param {string} url
	 * @returns {string|null}
	 */
	getLastRegTokenId (url) {
		let result = ajax.getLoggerInfo(url);

		if (result) {
			let xhr = result[result.length - 1].xhr,
				response = JSON.parse(xhr.responseText);

			return response.body;
		}

		return null;
	},

	initPassRestoreRegTokenIdLog () {
		return this.initRegTokenIdLog('user/password/restore');
	},

	getPassRestoreRegTokenId () {
		let result = this.getLastRegTokenId('user/password/restore');

		return result && result.id;
	},

	initAccessRestoreRegTokenIdLog () {
		return this.initRegTokenIdLog('user/access/support');
	},

	getAccessRestoreRegTokenId () {
		let result = this.getLastRegTokenId('user/access/support');

		return result && result.id_phones;
	},

	/**
	 * Get SMS code from internal-api
	 * @param  {string} email
	 * @param  {string} id
	 * @returns {Promise}
	 */
	getSmsCodeValue (email, id) {
		return API.getSmsCode(email, id).then(data => {
			return data;
		}, error => {
			throw new Error(error);
		});
	}
};
