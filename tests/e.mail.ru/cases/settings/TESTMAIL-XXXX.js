'use strict';

let Sent = require('../../steps/settings');

describe('TESTMAIL-XXX', () => {
	it('Открытие стрницы настроек', () => {
		Sent.auth();
		Sent.open();
	});
});
