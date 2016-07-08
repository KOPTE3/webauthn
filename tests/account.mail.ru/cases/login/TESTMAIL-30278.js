'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();
let AuthorizationErrors = require('../../store/authorization/errors');

describe('TESTMAIL-30278', () => {
	it('Отображение ошибки errno=706', () => {
		let errno = 706;

		LoginPage.open({ errno });
		loginForm.getError(AuthorizationErrors.codes[errno]);
	});
});
