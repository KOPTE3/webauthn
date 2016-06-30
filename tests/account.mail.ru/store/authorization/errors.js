'use strict';

let AuthorizationStore = require('../authorization');

/** Модуль для работы с данными ошибок авторизации */
class AuthorizationErrors extends AuthorizationStore {
	constructor () {
		super();
	}

	/**
	 * Список кодом ошибок
	 *
	 * @type {Object}
	 */
	get codes () {
		return {
			1: 'Повторите попытку через некоторое время.',

			11: 'Замечены подозрительные попытки входа в ваш почтовый ящик.\n' +
				'Возможно, вы ошиблись в вводе пароля или заходите в ящик из ' +
				'необычного места. Чтобы мы убедились, что это вы, пожалуйста, ' +
				'введите еще раз пароль и код с картинки.',

			25: 'Учетная запись заблокирована.\nДоступ данного пользователя ' +
				'к почтовому ящику заблокирован. За разъяснениями обратитесь' +
				' в Службу Поддержки пользователей.',

			706: 'Произошла ошибка! Пожалуйста, повторите попытку через ' +
				'некоторое время или введите логин и пароль другого почтового ящика.'
		};
	}

	get (code) {
		return this.codes[code];
	}
}

module.exports = new AuthorizationErrors();