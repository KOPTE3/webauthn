'use strict';

let LoginPage = require('../../steps/login');

describe(() => {
	it('Отображение ошибки errno=1', () => {
		LoginPage.open();
	});
});
