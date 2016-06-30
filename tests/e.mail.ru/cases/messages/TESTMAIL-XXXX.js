'use strict';

let Messages = require('../../steps/messages');

describe('TESTMAIL-XXX', () => {
	it('Открытие страницы списка писем', () => {
		Messages.auth();
		Messages.open();
	});
});
