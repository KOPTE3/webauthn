'use strict';

let path = require('path');
let Store = require('../../store');

/** Модуль для работы с данными поиска */
class Search extends Store {
	constructor () {
		super();
	}
}

module.exports = new Search();