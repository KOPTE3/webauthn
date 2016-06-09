'use strict';

/** @namespace describe */
/** @namespace it */

class PageObject {
	open(path) {
		browser.url(path);
	}

	/**
	 * Combine selectors in CSS cascade
	 * @static
	 * @param  {Object} locators
	 * @param  {string} parent
	 * @return {Objcet}
	 */
	static cssInherit(locators, parent) {
		for (let name in locators) {
			if (locators.hasOwnProperty(name)) {
				locators[name] = `${parent} ${locators[name]}`;
			}
		}

		return locators;
	}
}

module.exports = PageObject;
