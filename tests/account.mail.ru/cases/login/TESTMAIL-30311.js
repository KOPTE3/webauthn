'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let loginForm = new LoginForm();

describe('TESTMAIL-30311', () => {
	it('Постановка фокуса при первом открытии страницы', () => {
		LoginPage.open();
		loginForm.checkActiveElement();
	});
});

