'use strict';

let fs = require('fs');

/**
 * Включает контент файла на страницу
 *
 * @param {string} file — имя файла
 * @return {browser}
 */
module.exports = file => {
	try {
		let content = fs.readFileSync(file, { encoding: 'utf-8' });

		return browser.execute(content);

	} catch (error) {
		throw new Error(`[yoda]: Could read the passed file "${file}"\n`, error.stack);
	}
};
