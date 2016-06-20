'use strict';

let AccountManager = require('@qa/account-manager');

class PageObject {
    constructor () {
        this.account = new AccountManager.Session();
    }

    open (path) {
        browser.url(path);
    }

    auth (type) {
        let cookie = this.account.get('cookies', type);

        browser.url('/');
        browser.setCookies(cookie);
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
