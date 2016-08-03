'use strict';

let userAdd = require('./add');
let userEdit = require('./edit');
let helpers = require('../helpers');

/** Модуль для работы с учетными данными пользователя */
module.exports = {
	/**
	 * Register new user through internal api
	 * http://api.tornado.dev.mail.ru/users/add
	 *
	 * @param {Object} params
	 *                 {number|array} phones
	 *                 1, 2 - number of unlimited phones (verified)
	 *                 [...] - array according to api
	 *
	 *                 {Object} restore - user restore data
	 *                 {Object} credentials - any other params from api
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
	 *
	 * @param {Object} params
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
		let user = email.split('@');

		return this.edit({
			login: user[0],
			domain: user[1],
			flags: {
				mrim_disabled: value
			}
		});
	}
};
