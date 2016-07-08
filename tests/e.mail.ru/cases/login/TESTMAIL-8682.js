'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();
let Providers = require('../../store/login/providers');
let providers = new Providers();

describe('TESTMAIL-8682', () => {
	it('Выделение соответствующей иконки домена при вводе email с доменом', () => {
		LoginPage.open();

		providers.active.forEach(({ name }) => {
			loginForm.setLogin(`example@${name}`);
			loginForm.getActiveDomain(name);
		});
	});
});
