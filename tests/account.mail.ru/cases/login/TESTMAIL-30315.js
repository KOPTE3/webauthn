'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');

describe('TESTMAIL-30315', () => {
	it('Переход на страницу восстановления пароля', () => {
		LoginPage.open();
	});
});
