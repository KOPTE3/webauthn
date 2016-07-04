'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');

describe('TESTMAIL-30316', () => {
	it('Проверка перехода на страницу регистрации', () => {
		LoginPage.open();
		loginForm.clickSignUpLink();
	});
});
