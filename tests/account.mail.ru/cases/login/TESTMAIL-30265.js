'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let authorizationErrors = require('../../store/authorization/errors');

let loginForm = new LoginForm();

describe('TESTMAIL-30265', () => {
	it('Отображение ошибки errno=1', () => {
		let errno = 1;

		LoginPage.open({ errno });
		loginForm.getError(authorizationErrors.codes[errno]);
	});
});
