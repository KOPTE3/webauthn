'use strict';

let TestTools = require('@qa/test-tools');

let support = new TestTools.Support();

const ASYNC_TIMEOUT = 10000;

/** Набор базовых методов */
module.exports = {
	/**
	 * Расширяет заданный объект
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @returns {Object}
	 */
	extend (to, from) {
		return support.extend(...arguments);
	},

	/**
	 * Waits for request to succeed
	 * @param {Function} request
	 *         returns Promise
	 *         result {
	 *             {Function} isOK - result status,
	 *             {*} value - result
	 *         }
	 * @param {string} message
	 *        error message if !isOK
	 *
	 * @returns {Object} response
	 */
	waitForResponse ({request, message}) {
		let response = {};

		browser.waitUntil(function async () {
			return request().then(result => {
				response = result;

				return result.isOK();
			});
		}, ASYNC_TIMEOUT, `${message}: ${JSON.stringify(response)}`);

		return response.value;
	}
};
