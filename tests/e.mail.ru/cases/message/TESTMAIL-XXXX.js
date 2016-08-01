'use strict';

let Message = require('../../steps/message');

describe(() => {
	it('Открытие страницы письма', () => {
		Message.auth();
		Message.open();
	});
});
