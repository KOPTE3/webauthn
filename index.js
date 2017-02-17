#!/usr/bin/env node

'use strict';

let minimist = require('minimist');
let options = process.argv.slice(2);

options = minimist(options);

if (options.verbose) {
	process.env.DEBUG = '@qa*';
}

let runner = require('./tasks/runner');

/**
 * Yoda runner
 *
 * @returns {Promise}
 */
module.exports = runner({
	data: options,
	file: options.config || 'config.js'
});
