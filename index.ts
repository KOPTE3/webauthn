/// <reference path="./types/index.d.ts" />

import * as minimist from 'minimist';

let options: string[] = process.argv.slice(2);

let flags: Yoda.Options = minimist(options);

if (flags.verbose) {
	process.env.DEBUG = '@qa*';
}

let runner = require('./tasks/runner');

/**
 * Yoda runner
 *
 * @returns {Promise}
 */
exports.default = runner({
	data: flags,
	file: flags.config || 'config.js'
});
