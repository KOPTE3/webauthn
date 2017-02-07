#!/usr/bin/env node

'use strict';

let minimist = require('minimist');
let merge = require('deepmerge');
let Log = require('tir');

let options = process.argv.slice(2);

options = minimist(options);

if (options.verbose) {
	process.env.DEBUG = '@qa*';
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
