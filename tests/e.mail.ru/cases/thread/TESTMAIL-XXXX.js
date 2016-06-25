'use strict';

let page = require('../../steps/thread');

describe('TESTMAIL-XXX', () => {
	it('Открытие треда', () => {
		page.auth();
		page.open();
	});
});
