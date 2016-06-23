'use strict';

let PageObject = require('../../pages');

class Editor extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container: '.mceToolbarRow1'
		};
	}

	wait () { }
}

module.exports = new Editor();
