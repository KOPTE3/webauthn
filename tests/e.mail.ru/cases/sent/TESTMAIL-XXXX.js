'use strict';

let page = require('../../steps/sent');

describe('TESTMAIL-XXX', () => {
	it('Открытие страницы отправленного письма', () => {
		page.auth();
		page.open();
	});
});
