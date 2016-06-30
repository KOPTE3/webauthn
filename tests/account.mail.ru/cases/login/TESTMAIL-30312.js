'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');

describe('TESTMAIL-30312', () => {
	it('Постановка галочки "Запомнить" по умолчанию при открытии страницы', () => {
		LoginPage.open();
		loginForm.checkSessionState();
	});
});
