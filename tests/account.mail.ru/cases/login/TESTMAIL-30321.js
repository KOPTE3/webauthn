'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');
let AuthStore = require('../../store/authorization');
let Providers = require('../../store/authorization/providers');

describe('TESTMAIL-30321', () => {
	it('Успешная авторизация внешним аккаунтом, работающим по паролю, ' +
		'при отсутствии авторизованных пользователей', () => {
		LoginPage.open({ 'allow_external': 1 });

		let providers = new Providers();

		providers = providers.top('external');

		let auth = new AuthStore();

		providers.forEach(domain => {
			let { email: username, password } = auth.credentials('external', { domain });

			loginForm.setCredentials({ username, password });
			loginForm.clickBySignInButton();
		});
	});
});
