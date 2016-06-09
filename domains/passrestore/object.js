'use strict';
const path = require('path');
const PageObject = require(path.resolve(process.cwd(), 'object'));

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

	get accountView () {
		let rootEl = '.js-view-account';
		const locators = {
			title: '.password-recovery__remind-new-header',
			error: '.js-error',
			input: '.js-input-login',
			select: '.js-input-domain',
			btn: 'button[type="submit"]'
		};

		return PageObject.cssInherit(locators, rootEl);
	}
}

module.exports = new Page();
