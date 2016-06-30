'use strict';

let AddressBook = require('../../steps/addressbook');

describe('TESTMAIL-XXXX', () => {
	it('Открытие адресной книги', () => {
		AddressBook.auth();
		AddressBook.open();
	});
});
