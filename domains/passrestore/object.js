'use strict';
const path = require('path');

console.log(path.resolve(process.cwd(), 'object'))
let PageObject = require(path.resolve(process.cwd(), 'object'));

class Page extends PageObject {
	constructor () {
		super();
	}

	open (url) {
		super.open(url);

		browser.setViewportSize({
			width: 1500,
			height: 768
		});

		browser.waitUntil(() => browser.element('.password-recovery__remind__new'));

	}

	get view () {
		return '.js-view-account';
	}
}

module.exports = new Page();
