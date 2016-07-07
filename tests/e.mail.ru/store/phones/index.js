'use strict';

let path = require('path');
let Store = require('../../store');

/** Модуль для работы с данными поиска */
class Phones extends Store {
	constructor () {
		super();
	}
}

module.exports = new Phones();
