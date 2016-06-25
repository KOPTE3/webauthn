'use strict';

let path = require('path');
let TestTools = require('@qa/test-tools');

module.exports = grunt => {
	return {
		'e.mail.ru': {
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
				file: path.resolve('tests/e.mail.ru/config.js'),
				data: {
					//baseUrl: `https://pre.test.mail.ru`
				}
			}
		}
	};
};
