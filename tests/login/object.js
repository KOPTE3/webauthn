'use strict';

let PageObject = require(process.cwd() + '/facts/object');

class Page extends PageObject {
    constructor () {
        super();
    }
    
    get providers () {
        return [
            'mail.ru',
            'yandex.ru',
            'rambler.ru',
            'gmail.com',
            'other'
        ];
    }
}

module.exports = new Page();
