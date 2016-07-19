'use strict';

let Steps = require('../../steps');
let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let accounts = require('../../store/authorization/accounts');
let providers = require('../../store/authorization/providers');

let loginForm = new LoginForm();

describe('TESTMAIL-30321', () => {
	it('Успешная авторизация внешним аккаунтом, работающим по паролю, ' +
		'при отсутствии авторизованных пользователей', () => {
		let top = providers.top('external');

		top.forEach(domain => {
			LoginPage.open({ 'allow_external': 1 });

			let { username, password } = accounts.get(domain, ['external']);

			loginForm.clickByDomain('other');
			loginForm.setCredentials({ username, password });
			loginForm.clickBySignInButton();

			Steps.isActiveUser(username, 2000);
			Steps.reload();
		});
	});
});
