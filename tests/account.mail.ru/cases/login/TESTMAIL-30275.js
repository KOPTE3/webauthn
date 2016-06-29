'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');
let AuthorizationErrors = require('../../store/authorization/errors');

describe('TESTMAIL-30275', () => {
	it('Отображение ошибки errno=25', () => {
		let errno = 25;

		LoginPage.open({ errno });
		loginForm.getError(AuthorizationErrors.codes[errno]);
	});
});
