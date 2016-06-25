'use strict';

let page = require('../../steps/addressbook');

describe('TESTMAIL-XXX', () => {
	it('Открытие адресной книги', () => {
		page.auth();
		page.open();
	});
});
