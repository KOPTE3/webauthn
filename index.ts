#!/usr/bin/env node
/// <reference path="./types/index.d.ts" />
import 'core-js';
import 'reflect-metadata';
import './lib';
import * as minimist from 'minimist';

let options: string[] = process.argv.slice(2);

let flags: Yoda.Options = minimist(options);

if (flags.verbose) {
	process.env.DEBUG = '@qa*';
}

import runner from './tasks/runner';

/** Yoda runner */
export default runner({
	data: flags,
	file: flags.config || 'config.js'
});
