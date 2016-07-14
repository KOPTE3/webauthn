'use strict';

let assert = require('assert');

let PasswordRestoreSteps = require('../restore');
let AccessPage = require('../../../pages/passrestore/access');

let phonesUtils = require('../../../utils/phones');


/** Модуль для работы с формой ввода на восстановлении доступа (mrim) */
class SelectTypeSteps extends PasswordRestoreSteps {
	constructor () {
		super();
		this.page = new AccessPage();
	}
}

module.exports = SelectTypeSteps;
