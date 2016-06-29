'use strict';

let path = require('path');
let fs = require('fs');
let TestTools = require('@qa/test-tools');

module.exports = grunt => {
	return {
		options: {
		/*
			jira: {
				username: 'test-runner',
				password: 'CAArKpPe',
				protocol: 'https',
				host    : 'jira.mail.ru',
				status  : 27411
			},
		*/

			hooks: {
				init () {
					fs.readFile('files/logo.txt', {
						encoding: 'utf-8'
					},
					(error, logo) => {
						console.log(logo);
					});
				}
			}
		},

		'e.mail.ru': {
			service: {
				name: 'wdio',
				file: path.resolve('tests/e.mail.ru/config.js')
			}
		},

		'e.mail.ru-omega': {
			service: {
				name: 'wdio',
				file: path.resolve('tests/e.mail.ru/config.js'),
				data: {
					baseUrl: `https://${TestTools.Git.branch}.omega.test.mail.ru`
				}
			}
		},

		'account.mail.ru': {
			service: {
				name: 'wdio',
				file: path.resolve('tests/account.mail.ru/config.js')
			}
		},

		'account.mail.ru-omega': {
			service: {
				name: 'wdio',
				file: path.resolve('tests/account.mail.ru/config.js'),
				data: {
					baseUrl: `https://${TestTools.Git.branch}.account.omega.test.mail.ru`
				}
			}
		}
	};
};
