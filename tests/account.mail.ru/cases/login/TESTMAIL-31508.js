'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let store = require('../../store/login/form');
let accounts = require('../../store/authorization/accounts');

let loginForm = new LoginForm();

describe(() => {
	it('Страница логина. Выбор внешних доменов через меню ' +
		'при наличии авторизованных ранее аккаунтов', () => {
		let { username } = accounts.get({ features: ['phone_verified'] });

		LoginPage.open({
			email: username,
			restore: 'phone'
		});

		loginForm.clickSignInButton();
		loginForm.restoreBlockVisibility();
		loginForm.isMaskedPhoneNumber();
		loginForm.sendCode();
		loginForm.restoreFormVisibility();
	});
});
