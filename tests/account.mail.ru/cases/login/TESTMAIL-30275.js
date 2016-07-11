'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let authorizationErrors = require('../../store/authorization/errors');

let loginForm = new LoginForm();

describe('TESTMAIL-30275', () => {
	it('Отображение ошибки errno=25', () => {
		let errno = 25;

		LoginPage.open({ errno });
		loginForm.getError(authorizationErrors.codes[errno]);
	});
});
