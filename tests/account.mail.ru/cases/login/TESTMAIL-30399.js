'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');

describe('TESTMAIL-30399', () => {
	it('Отображение ошибки errno=1', () => {
		LoginPage.open();
	});
});