'use strict';


module.exports = grunt => {
    return {
        options: {
            configFile: './.eslintrc.js',
        },
        files: [
            './*.js',
            './domains/**/*.js',
            './plugins/**/*.js'
        ]
    }
};
