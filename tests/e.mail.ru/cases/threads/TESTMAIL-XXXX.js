'use strict';

let page = require('../../steps/threads');

describe('TESTMAIL-XXX', () => {
	it('Открытие списка тредов', () => {
		page.auth();
		page.open();
	});
});
