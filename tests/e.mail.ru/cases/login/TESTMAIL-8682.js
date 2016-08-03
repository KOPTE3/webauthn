'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let providers = require('../../store/login/providers');

let loginForm = new LoginForm();

describe(() => {
	it('Выделение соответствующей иконки домена при вводе email с доменом', () => {
		LoginPage.open();

		providers.active.forEach(({ name }) => {
			loginForm.setLogin(`example@${name}`);
			loginForm.getActiveDomain(name);
		});
	});
});
