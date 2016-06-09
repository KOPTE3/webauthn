'use strict';

const path = require('path');
const load = require('load-grunt-config');
const time = require('time-grunt');

module.exports = grunt => {
    time(grunt);

    let tasks = path.join(process.cwd(), 'tasks');

    load(grunt, {
        configPath: tasks,

        jitGrunt: {
            staticMappings: {
                'test-runner': '@qa/grunt-test-runner'
            }
        }
    });
};
