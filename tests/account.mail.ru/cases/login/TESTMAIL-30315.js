'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();

describe('TESTMAIL-30315', () => {
	it('Переход на страницу восстановления пароля', () => {
		LoginPage.open();
		loginForm.clickPassRemindLink();
	});
});
