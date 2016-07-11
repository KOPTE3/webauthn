'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let authStore = require('../../store/authorization');
let store = require('../../store/login/form');

let loginForm = new LoginForm();

describe('TESTMAIL-30321', () => {
	it('Успешная авторизация внешним аккаунтом, работающим по паролю, ' +
		'при отсутствии авторизованных пользователей', () => {
		store.providers.external.forEach(domain => {
			LoginPage.open({ 'allow_external': 1 });

			let { email: username, password } = authStore.credentials('external', {
				domain
			});

			loginForm.clickByDomain('other');
			loginForm.setCredentials({ username, password });
			loginForm.clickBySignInButton();
			loginForm.waitForUrl(/messages/);
		});
	});
});
