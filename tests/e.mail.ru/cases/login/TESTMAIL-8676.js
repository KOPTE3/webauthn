'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');

let loginForm = new LoginForm();

describe(() => {
	it('Отсутствие списка доменов при выборе иконки домена "Другие"', () => {
		LoginPage.open();
		loginForm.clickDomain('other');
		loginForm.isSelectVisible();
	});
});
