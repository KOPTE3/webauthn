#!/usr/bin/env node
/// <reference path="./types/index.d.ts" />
import 'core-js';
import * as minimist from 'minimist';
import 'reflect-metadata';
import './lib';


let options: string[] = process.argv.slice(2);

let flags: Yoda.Options = minimist(options);

if (flags.verbose) {
	process.env.DEBUG = '@qa*';
}

let task: Promise<void> = Promise.resolve();

if (flags._.includes('gen')) {
	const runner = require('./tasks/gen');

	/** Yoda runner */
	task = runner.default({
		root: flags.root,
	});
} else {
	const runner = require('./tasks/runner');

	/** Yoda runner */
	task = runner.default({
		data: flags,
		file: flags.config || 'config.js',
	});
}

task
	.catch(console.error);

export default task;
