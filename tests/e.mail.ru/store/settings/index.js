'use strict';

let path = require('path');
let Store = require('../../store');

/** Модуль для работы с данными настроек */
class Settings extends Store {
	constructor () {
		super();
	}
}

module.exports = new Settings();
