'use strict';

var path = require('path'),
    load = require('load-grunt-config'),
    time = require('time-grunt');

module.exports = function (grunt) {
    time(grunt);

    var tasks = path.join(process.cwd(), 'tasks');

    load(grunt, {
        configPath: tasks,

        jitGrunt: {
            staticMappings: {
                'test-runner': '@qa/grunt-test-runner'
            }
        }
    });
};
