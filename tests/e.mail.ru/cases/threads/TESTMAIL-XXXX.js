'use strict';

let Threads = require('../../steps/threads');

describe(() => {
	it('Открытие списка тредов', () => {
		Threads.auth();
		Threads.open();
	});
});
