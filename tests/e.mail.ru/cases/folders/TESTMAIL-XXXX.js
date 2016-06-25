'use strict';

let page = require('../../steps/folders');

describe('TESTMAIL-XXX', () => {
	it('Открытие списка папок', () => {
		page.auth();
		page.open();
	});
});
