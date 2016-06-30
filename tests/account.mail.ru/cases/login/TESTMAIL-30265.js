'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');
let AuthorizationErrors = require('../../store/authorization/errors');

describe('TESTMAIL-30265', () => {
	it('Отображение ошибки errno=1', () => {
		LoginPage.open({ errno: 1 });
		let errno = 1;

		LoginPage.open({ errno });
		loginForm.getError(AuthorizationErrors.codes[errno]);
	});
});
