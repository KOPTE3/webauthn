'use strict';

let assert = require('assert');

let ContextmenuPage = require('../../pages/filesearch/contextmenu');
let FilesearchSteps = require('../filesearch');

/** Модуль для работы с формой страницы написания письма */
class ContextmenuSteps extends FilesearchSteps {
	constructor () {
		super();
		this.contextmenu = new ContextmenuPage();
	}

	download () {
		this.contextmenu.clickButton('download');
	}
}

module.exports = ContextmenuSteps;
