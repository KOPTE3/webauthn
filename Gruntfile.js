'use strict';

var path = require('path'),
	exec = require('child_process').execSync,
	load = require('load-grunt-config'),
	time = require('time-grunt');

module.exports = function (grunt) {
	time(grunt);

	var tasks = path.join.bind(null, process.cwd(), 'tasks');

	load(grunt, {
		configPath: tasks(),

		jitGrunt: {
			loadTasks: tasks('custom'),

			staticMappings: {
				'test-runner': '@qa/grunt-test-runner'
			}
		},

		data: {
			changes  : [],
			picked   : [],
			files    : '//img.imgsmail.ru'
		}
	});
};
