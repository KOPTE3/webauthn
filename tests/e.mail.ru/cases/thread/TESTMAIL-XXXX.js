'use strict';

let Thread = require('../../steps/thread');

describe('TESTMAIL-XXX', () => {
	it('Открытие треда', () => {
		Thread.auth();
		Thread.open();
	});
});
