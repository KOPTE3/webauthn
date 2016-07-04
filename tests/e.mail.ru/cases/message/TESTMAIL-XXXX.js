'use strict';

let Message = require('../../steps/message');

describe('TESTMAIL-XXX', () => {
	it('Открытие страницы письма', () => {
		Message.auth();
		Message.open();
	});
});
