#!/usr/bin/env node

'use strict';

let minimist = require('minimist');
let merge = require('deepmerge');
let deindent = require('deindent');
let Log = require('tir');

let options = process.argv.slice(2);

options = minimist(options);

if (options.verbose) {
	process.env.DEBUG = '@qa*';
}

// Добавляем поддержку TypeScript
if (options.ts) {
	try {
		let ts = require('ts-node');

		ts.register();
	} catch (error) {
		Log.error(deindent `It seems you forgot to add some dependencies to your package.json:
					\t"@types/node": "^6.0.52",
					\t"typescript": "^2.1.5",
					\t"ts-node": "^2.1.0"`);
	}
}

let { runner, linter } = require('./tasks');

let { axis, split, lint, config = 'config.js' } = options;
let errors = 0;

// Запускаем линтер только во время разработки
// Параметры axis и split специфичны для параллельного запуска тестов через Jenkins
if (lint && !axis && !split) {
	if (lint === true) {
		lint = [];
	} else if (!Array.isArray(lint)) {
		lint = [lint];
	}

	errors = linter(lint);
}

/**
 * Yoda runner
 *
 * @returns {Promise}
 */
if (errors > 0) {
	module.exports = Promise.reject(`ESLint: found errors: "${errors}"`);
} else {
	module.exports = runner({ data: options, file: config });
}
