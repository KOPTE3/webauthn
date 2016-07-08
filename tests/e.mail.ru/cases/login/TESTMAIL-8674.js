'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();
let Providers = require('../../store/login/providers');
let providers = new Providers();

describe('TESTMAIL-8674', () => {
	it('Выделение соответствующей иконки домена при выборе домена в списке', () => {
		LoginPage.open();

		providers.active.forEach(({ name }) => {
			loginForm.selectDomain(name);
			loginForm.getActiveDomain(name);
		});
	});
});
