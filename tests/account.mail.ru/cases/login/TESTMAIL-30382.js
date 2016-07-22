'use strict';

let Steps = require('../../steps');
let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let accounts = require('../../store/authorization/accounts');

let loginForm = new LoginForm();

describe('TESTMAIL-30326', () => {
	it('Страница логина. Успешная авторизация биз-аккаунтами ' +
		'(при включенных социальных и отсутствии авторизованных пользователей)', () => {
		LoginPage.open({
			vk: 1,
			ok: 1,
			fb: 1
		});

		let { username, password } = accounts.get('testmail.3proxy.ru', ['pdd']);

		loginForm.setCredentials({ username, password });
		loginForm.clickSignInButton();

		Steps.isActiveUser(username);
	});
});
