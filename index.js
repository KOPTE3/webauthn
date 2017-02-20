#!/usr/bin/env node
"use strict";
const minimist = require("minimist");
let options = process.argv.slice(2);
let flags = minimist();
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
//# sourceMappingURL=index.js.map