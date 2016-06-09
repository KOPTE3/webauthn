'use strict';

module.exports = grunt => {
    return {
        options: {
            configFile: './.eslintrc.js'
        },

        files: [
            './*.js',
            './{facts,tasks,tests}/**/*.js'
        ]
    };
};
