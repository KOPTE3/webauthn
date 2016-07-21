'use strict';

let PassrestorePage = require('../passrestore');

/** Модуль для работы с формой ввода адреса */
class RecoveryPage extends PassrestorePage {
	constructor () {
		super();
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.js-view-restore',
			form: '.js-form-restore',
			password: '.js-input-password',
			repassword: '.js-input-repassword'
		};
	}
}

module.exports = RecoveryPage;
