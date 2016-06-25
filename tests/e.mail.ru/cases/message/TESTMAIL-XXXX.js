'use strict';

let page = require('../../steps/message');

describe('TESTMAIL-XXX', () => {
	it('Открытие страницы письма', () => {
		page.auth();
		page.open();
	});
});
