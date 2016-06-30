'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');
let AuthorizationErrors = require('../../store/authorization/errors');

describe('TESTMAIL-30278', () => {
	it('Отображение ошибки errno=706', () => {
		let errno = 706;

		LoginPage.open({ errno });
		loginForm.getError(AuthorizationErrors.codes[errno]);
	});
});
