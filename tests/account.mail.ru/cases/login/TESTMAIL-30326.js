'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let store = require('../../store/login/form');

let loginForm = new LoginForm();

describe('TESTMAIL-30326', () => {
	it('Выбор внешних доменов через кнопки при отсутствии авторизованных ранее аккаунтов', () => {
		LoginPage.open({ 'allow_external': 1 });

		store.providers.buttons.forEach(provider => {
			loginForm.clickDomain(provider);
			loginForm.getSelectedDomain(provider);
		});
	});
});
