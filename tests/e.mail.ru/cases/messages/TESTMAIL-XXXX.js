'use strict';

let Messages = require('../../steps/messages');

describe(() => {
	it('Открытие страницы списка писем', () => {
		Messages.auth();
		Messages.open();
	});
});
