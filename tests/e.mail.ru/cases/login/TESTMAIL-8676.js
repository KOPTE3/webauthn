'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');

let loginForm = new LoginForm();

describe('TESTMAIL-8676', () => {
	it('Отсутствие списка доменов при выборе иконки домена "Другие"', () => {
		LoginPage.open();
		loginForm.clickByDomain('other');
		loginForm.isSelectVisible();
	});
});
