'use strict';

let Thread = require('../../steps/thread');

describe(() => {
	it('Открытие треда', () => {
		Thread.auth();
		Thread.open();
	});
});
