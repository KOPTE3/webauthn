'use strict';

class PageObject {
    open (path) {
        browser.url(path);
    }

    /**
     * Combine selectors in CSS cascade
     *
     * @static
     * @param  {Object} locators
     * @param  {string} parent
     * @return {Object}
     */
    static cssInherit (locators, parent) {
        for (let name in locators) {
            if (Object.prototype.hasOwnProperty.call(locators, name)) {
                locators[name] = `${parent} ${locators[name]}`;
            }
        }

        return locators;
    }
}

module.exports = PageObject;
