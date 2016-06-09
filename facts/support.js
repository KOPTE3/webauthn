'use strict';

let path = require('path'),
    fs = require('fs');

module.exports = {
    /**
     * Метод обеспечивает загрузку тестовых кейсов в заданной директории
     *
     * @param {string} directory
     */
    cases (directory) {
        let cases = path.resolve(directory, 'cases'),
            files = fs.readdirSync(cases);

        files.forEach(file => {
            if (file.endsWith('.js')) {
                file = path.join(cases, file);

                try {
                    require(file);
                }
                catch (error) {
                    throw new Error(`Could not find required test case: \n\t${file}`);
                }
            }
        });
    }
};
