'use strict';

let userAdd = require('./add');
let userEdit = require('./edit');
let helpers = require('../helpers');

/**
 * Works with user reg info
 * @see cases/passrestore/MAIL-38089/TESTMAIL-XXXX.js for example
*/
module.exports = {
	/**
	 * Register new user through internal api
	 * @see http://api.tornado.dev.mail.ru/users/add
	 *
	 * @param {Object} params
	 *                 {number|array} [phones]
	 *                 1, 2 - number of unlimited phones (verified)
	 *                 OR
	 *                 [...] - array according to api
	 *
	 *                 {Object} [restore] - user restore data
	 *                 {Object} [credentials] - any other params from api
	 * @returns {Object} - user data
	 */
	add (params) {
		return helpers.waitForResponse({
			request: userAdd.bind(null, params),
			message: 'Could not add new user'
		});
	},

	/**
	 * Edit user info
	 * @see http://api.tornado.dev.mail.ru/users/edit
	 *
	 * @param {Object} params
	 *                 {string} login (required)
	 *                 {string} domain (required)
	 *                 any other params from api
	 *
	 * @returns {number} user id
	 */
	edit (params) {
		return helpers.waitForResponse({
			request: userEdit.bind(null, params),
			message: 'Could not edit user'
		});
	},

	/**
	 * Mrim user
	 *
	 * @param {string} email
	 * @param {boolean} value
	 * @returns {number} user id
	 */
	mrim (email, value = false) {
		let [login, domain] = email.split('@');

		return this.edit({
			login,
			domain,
			flags: {
				mrim_disabled: value
			}
		});
	}
};
