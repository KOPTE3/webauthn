'use strict';

let PageObject = require('../page');

class Page extends PageObject {
	constructor () {
		super();
	}

	get locator () {
		return {
			compose: '.js-login-page__external__input_domain',
		}
	}


}

module.exports = new Page();
