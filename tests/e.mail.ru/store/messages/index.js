'use strict';

let Store = require('../../store');

/** Модуль для работы данными списка писем */
class Messages extends Store {
	constructor () {
		super();
	}
}

module.exports = new Messages();
