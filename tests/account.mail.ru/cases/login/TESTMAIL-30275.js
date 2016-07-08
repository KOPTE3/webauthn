'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();
let AuthorizationErrors = require('../../store/authorization/errors');

describe('TESTMAIL-30275', () => {
	it('Отображение ошибки errno=25', () => {
		let errno = 25;

		LoginPage.open({ errno });
		loginForm.getError(AuthorizationErrors.codes[errno]);
	});
});
