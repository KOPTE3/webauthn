'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();
let AuthorizationErrors = require('../../store/authorization/errors');

describe('TESTMAIL-30269', () => {
	it('Отображение ошибки errno=11', () => {
		let errno = 11;

		LoginPage.open({ errno });
		loginForm.getError(AuthorizationErrors.codes[errno]);
	});
});
