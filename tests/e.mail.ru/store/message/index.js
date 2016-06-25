'use strict';

let path = require('path');
let Store = require('../../store');

/** Модуль для работы с данными письма */
class Message extends Store {
	constructor () {
		super();
	}
}

module.exports = new Message();
