'use strict';

let path = require('path');
let Store = require('../../store');

/** Модуль для работы с данными адресной книги */
class AddressBook extends Store {
	constructor () {
		super();
	}
}

module.exports = new AddressBook();
