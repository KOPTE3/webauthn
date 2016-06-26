'use strict';

let page = require('../../steps/addressbook');

describe('TESTMAIL-XXXX', () => {
	it('Открытие адресной книги', () => {
		page.auth();
		page.open();
	});
});
