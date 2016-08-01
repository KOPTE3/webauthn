'use strict';

let AddressBook = require('../../steps/addressbook');

describe(() => {
	it('Открытие адресной книги', () => {
		AddressBook.auth();
		AddressBook.open();
	});
});
