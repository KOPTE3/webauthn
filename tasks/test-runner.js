'use strict';

let path = require('path');
let childProcess = require('child_process');
let fs = require('fs');

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

					// Показ логотипа
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
				file: 'tests/e.mail.ru/config.js'
			}
		}
	};
};
