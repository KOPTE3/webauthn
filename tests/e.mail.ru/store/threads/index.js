'use strict';

let path = require('path');
let Store = require('../../store');

/** Модуль для работы с данными списка тредов */
class Threads extends Store {
	constructor () {
		super();
	}
}

module.exports = new Threads();
