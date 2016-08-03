'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();

describe(() => {
	it('Постановка галочки "Запомнить" по умолчанию при открытии страницы', () => {
		LoginPage.open();
		loginForm.checkSessionState();
	});
});
