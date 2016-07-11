'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let authorizationErrors = require('../../store/authorization/errors');

let loginForm = new LoginForm();

describe('TESTMAIL-30278', () => {
	it('Отображение ошибки errno=706', () => {
		let errno = 706;

		LoginPage.open({ errno });
		loginForm.getError(authorizationErrors.codes[errno]);
	});
});
