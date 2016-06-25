'use strict';

let path = require('path');
let Store = require('../../store');

/** Модуль для работы с данными списка папок */
class Folders extends Store {
	constructor () {
		super();
	}
}

module.exports = new Folders();
