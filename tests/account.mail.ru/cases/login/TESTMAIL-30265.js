'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();
let AuthorizationErrors = require('../../store/authorization/errors');

describe('TESTMAIL-30265', () => {
	it('Отображение ошибки errno=1', () => {
		LoginPage.open({ errno: 1 });
		let errno = 1;

		LoginPage.open({ errno });
		loginForm.getError(AuthorizationErrors.codes[errno]);
	});
});
