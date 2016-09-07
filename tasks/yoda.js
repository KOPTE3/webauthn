'use strict';

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
					childProcess.execSync('rm -rf cache/tests');
				}
			}
		},

		tests: {
			service: {
				name: 'wdio',
				file: 'tests/config.js'
			}
		}
	};
};
