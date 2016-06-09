'use strict';

let path = require('path');
let TestTools = require('@qa/test-tools');

module.exports = grunt => {
    return {
        omega: {
/*
            options: {
                jira: {
                    username: 'test-runner',
                    password: 'CAArKpPe',
                    protocol: 'https',
                    host    : 'jira.mail.ru'
                }
            },
*/

            service: {
                name: 'wdio',
                file: path.resolve('facts/config.js'),
/*
                data: {
                    baseUrl: `https://${TestTools.Git.branch}.omega.test.mail.ru`
                }
*/
            }
        }
    }
};
