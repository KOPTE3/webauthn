'use strict';

let page = require('../../steps/messages');

describe('TESTMAIL-XXX', () => {
	it('Открытие страницы списка писем', () => {
		page.auth();
		page.open();
	});
});
