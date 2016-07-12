'use strict';

let Steps = require('../../steps');
let store = require('../../store');
let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let authStore = require('../../store/authorization');

let loginForm = new LoginForm();

describe('TESTMAIL-30321', () => {
	it('Успешная авторизация внешним аккаунтом, работающим по паролю, ' +
		'при отсутствии авторизованных пользователей', () => {
		LoginPage.open({ 'allow_external': 1 });

		let { email: username, password } = authStore.credentials('external', {
			domain: 'yandex.ru'
		});

		let product = store.product('mail.ru');

		loginForm.clickByDomain('other');
		loginForm.setCredentials({ username, password });
		loginForm.clickBySignInButton();
		loginForm.waitForUrl(product.host);

		Steps.isActiveUser(username);
		// Steps.refresh();
	});
});
