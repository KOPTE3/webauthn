'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let providers = require('../../store/login/providers');

let loginForm = new LoginForm();

describe('TESTMAIL-8674', () => {
	it('Выделение соответствующей иконки домена при выборе домена в списке', () => {
		LoginPage.open();

		providers.active.forEach(({ name }) => {
			loginForm.selectDomain(name);
			loginForm.getActiveDomain(name);
		});
	});
});
