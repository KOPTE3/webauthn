'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');
let providers = require('../../store/login/providers');

describe('TESTMAIL-8682', () => {
	it('Выделение соответствующей иконки домена при вводе email с доменом', () => {
		LoginPage.open();

		providers.active.forEach(({ name }) => {
			loginForm.setLogin(`example@${name}`);
			loginForm.getActiveDomain(name);
		});
	});
});
