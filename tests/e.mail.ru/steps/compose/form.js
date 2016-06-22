'use strict';

/** @*/
class Compose extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу написания письма
	 */
	open () {
		browser.url('/compose');
		browser.waitForExist(locator)
	}

	/**
	 * Написать письмо
	 */
	send () { }


}

module.exports = new Compose();
