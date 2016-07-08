'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();

describe('TESTMAIL-30316', () => {
	it('Проверка перехода на страницу регистрации', () => {
		LoginPage.open();
		loginForm.clickSignUpLink();
	});
});
