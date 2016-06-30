'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');

describe('TESTMAIL-30311', () => {
	it('Постановка фокуса при первом открытии страницы', () => {
		LoginPage.open();
		loginForm.checkActiveElement();
	});
});
