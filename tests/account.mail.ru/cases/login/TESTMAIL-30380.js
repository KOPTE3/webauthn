'use strict';

let LoginPage = require('../../steps/login');

describe('TESTMAIL-30380', () => {
	it('Отображение ошибки errno=1', () => {
		LoginPage.open();
	});
});
