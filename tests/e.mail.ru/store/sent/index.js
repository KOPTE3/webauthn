'use strict';

let Store = require('../../store');

/** Модуль для работы с данными страницы отправленного письма */
class Sent extends Store {
	constructor () {
		super();
	}
}

module.exports = new Sent();
