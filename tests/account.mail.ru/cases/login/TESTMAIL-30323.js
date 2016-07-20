'use strict';

let Steps = require('../../steps');
let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let accounts = require('../../store/authorization/accounts');
let providers = require('../../store/authorization/providers');

let loginForm = new LoginForm();

describe('TESTMAIL-30323', () => {
	it('Страница логина. Успешная авторизация локальными аккаунтами ' +
		'(при включенных внешних и отсутствии авторизованных пользователей)', () => {
		for (let { hosts } of providers.get(['mail.ru'])) {
			for (let host of hosts) {
				LoginPage.open({ 'allow_external': 1 });

				let { username, password } = accounts.get(host, ['internal']);

				loginForm.setCredentials({ username, password });
				loginForm.clickBySignInButton();

				Steps.isActiveUser(username);
				Steps.reload();
			}
		}
	});
});
