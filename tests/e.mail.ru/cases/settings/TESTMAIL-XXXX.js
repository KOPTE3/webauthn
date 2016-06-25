'use strict';

let page = require('../../steps/settings');

describe('TESTMAIL-XXX', () => {
	it('Открытие стрницы настроек', () => {
		page.auth();
		page.open();
	});
});
