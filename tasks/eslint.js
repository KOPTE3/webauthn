'use strict';


module.exports = grunt => {
    return {
        options: {
            configFile: './.eslintrc.js',
        },
        files: [
            './*.js',
            './tasks/**/*.js',
            './facts/**/*.js',
            './plugins/**/*.js'
        ]
    }
};
