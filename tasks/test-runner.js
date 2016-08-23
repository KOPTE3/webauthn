'use strict';

let path = require('path');
let childProcess = require('child_process');

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
					// Удаляем директорию с кешем
					childProcess.execSync('rm -rf cache/tests');
				}
			}
		},

		'e.mail.ru': {
			service: {
				name: 'wdio',
				file: 'tests/e.mail.ru/config.js'
			}
		}
	};
};
