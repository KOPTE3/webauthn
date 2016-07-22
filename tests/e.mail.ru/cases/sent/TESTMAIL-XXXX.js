'use strict';

let Sent = require('../../steps/sent');

describe('TESTMAIL-XXX', () => {
	it('Открытие страницы отправленного письма', () => {
		Sent.auth();
		Sent.open();
	});
});
