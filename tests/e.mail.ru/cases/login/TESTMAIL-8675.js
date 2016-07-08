'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();
let providers = require('../../store/login/providers');

describe('TESTMAIL-8675', () => {
	it('Выделение соответствующей иконки домена при вводе email с доменом', () => {
		LoginPage.open();

		providers.active.forEach(({ name }) => {
			loginForm.clickByDomain(name);
			loginForm.getLoginValue(name);
		});
	});
});
