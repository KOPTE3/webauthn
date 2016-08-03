'use strict';

let assert = require('assert');

let SelectSteps = require('../restore/select');
let AccessPage = require('../../../pages/passrestore/access');

let phonesUtils = require('../../../utils/phones');


/** Модуль для работы с формой ввода на восстановлении доступа (mrim) */
class AccessSteps extends SelectSteps {
	constructor () {
		super();
		this.page = new AccessPage();
	}
}

module.exports = AccessSteps;
