'use strict';

let nconf = require('nconf');

class PageObject {
    static get account () {
        return new AccountManager();
    }

    open (path) {
        let user = nconf.get('user');

        browser.url('/login');
        browser.setCookies(user.cookies);
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
