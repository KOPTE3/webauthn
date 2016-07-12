'use strict';

let Steps = require('../../steps');
let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let authStore = require('../../store/authorization');

let loginForm = new LoginForm();

describe('TESTMAIL-30322', () => {
	it('Успешная авторизация внешним аккаунтом, работающим по OAuth, ' +
		'при отсутствии авторизованных пользователей', () => {
		LoginPage.open({ 'allow_external': 1 });

		let { email: username, password } = authStore.credentials('external', {
			domain: 'gmail.com'
		});

		loginForm.clickByDomain('other');
		loginForm.setCredentials({ username, password });
		loginForm.clickBySignInButton();
		loginForm.waitForUrl('https://mail.ru');
		Steps.isActiveUser(username);
		// Steps.refresh();
	});
});
