'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');

describe('TESTMAIL-30315', () => {
	it('Отображение ошибки errno=1', () => {
		LoginPage.open();
	});
});
