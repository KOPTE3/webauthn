'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');

describe('TESTMAIL-8676', () => {
	it('Отсутствие списка доменов при выборе иконки домена "Другие"', () => {
		LoginPage.open();
		loginForm.clickByDomain('other');
		loginForm.isSelectVisible();
	});
});
