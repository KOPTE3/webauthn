'use strict';

/** @namespace describe */
/** @namespace it */

class PageObject {
	open (path) {
		browser.url(path);
	}
}

module.exports = PageObject;
