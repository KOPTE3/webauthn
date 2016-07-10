'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let authStore = require('../../store/authorization');
let providers = require('../../store/authorization/providers');

let loginForm = new LoginForm();

describe('TESTMAIL-30321', () => {
	it('Успешная авторизация внешним аккаунтом, работающим по паролю, ' +
		'при отсутствии авторизованных пользователей', () => {
		LoginPage.open({ 'allow_external': 1 });

		providers = providers.top('external');

		providers.forEach(domain => {
			let { email: username, password } = authStore.credentials('external', { domain });

			loginForm.setCredentials({ username, password });
			loginForm.clickBySignInButton();
			loginForm.waitForUrl(/messages/);
		});
	});
});
