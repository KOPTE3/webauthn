'use strict';

let LoginPage = require('../../steps/login');

describe('TESTMAIL-30399', () => {
	it('Отображение ошибки errno=1', () => {
		LoginPage.open();
	});
});
