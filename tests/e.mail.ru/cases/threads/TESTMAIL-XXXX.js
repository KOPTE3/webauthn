'use strict';

let Threads = require('../../steps/threads');

describe('TESTMAIL-XXX', () => {
	it('Открытие списка тредов', () => {
		Threads.auth();
		Threads.open();
	});
});
