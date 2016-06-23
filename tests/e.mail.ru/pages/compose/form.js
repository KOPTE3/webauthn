'use strict';

let PageObject = require('../../pages');

class Form extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container: '.compose-head'
		};
	}

	wait () { }
}

module.exports = new Form();
