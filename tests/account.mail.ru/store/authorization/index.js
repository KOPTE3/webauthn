'use strict';

let DefaultAuthStore = require('../../../e.mail.ru/store/authorization');

/** Модуль для работы с авторизационными данными */
class AuthStore extends DefaultAuthStore {
	constructor () {
		super();
	}
}

module.exports = AuthStore;
