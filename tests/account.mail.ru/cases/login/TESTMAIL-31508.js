'use strict';

let LoginPage = require('../../steps/login');

describe('TESTMAIL-30508', () => {
	it('Отображение ошибки errno=1', () => {
		LoginPage.open();
	});
});
