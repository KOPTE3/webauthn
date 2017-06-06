import * as fs from 'fs';

/**
 * Включает исполняемный код на страницу
 */
browser.addCommand('inject', function (file) {
	try {
		let content = fs.readFileSync(file, { encoding: 'utf-8' });

		return this.execute(content);

	} catch (error) {
		throw new Error(`Could read the passed file "${file}"\n`, error.stack);
	}
});
