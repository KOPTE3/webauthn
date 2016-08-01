'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let authorizationErrors = require('../../store/authorization/errors');

let loginForm = new LoginForm();

describe(() => {
	it('Отображение ошибки errno=11', () => {
		let errno = 11;

		LoginPage.open({ errno });
		loginForm.getError(authorizationErrors.codes[errno]);
	});
});
