'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let store = require('../../store/login/form');

let loginForm = new LoginForm();

describe(() => {
	it('Страница логина. Выбор внешних доменов через меню ' +
		'при наличии авторизованных ранее аккаунтов', () => {
		LoginPage.open({ allow_external: 1 });

		store.providers.select.forEach(provider => {
			loginForm.selectDomain(provider);
			loginForm.getActiveDomain(provider);
		});
	});
});
