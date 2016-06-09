'use strict';

let PageObject = require(process.cwd() + '/facts/object');

class Page extends PageObject {
    constructor () {
        super();
    }
}

module.exports = new Page();
