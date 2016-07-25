'use strict';

let fs = require('fs');
let path = require('path');

/** Набор методов для работы с данными пользовательского окружения */
module.exports = {
	/**
	 * Возвращает полный путь к файлу
	 *
	 * @see https://stash.mail.ru/projects/QA/repos/test-files
	 * @param {string} name
	 * @returns {string}
	 */
	file (name) {
		let profile = '/var/lib/selenium/';

		if (/win/.test(this.platform)) {
			profile = '%USERPROFILE%';
		}

		if (/127\.0\.0\.1|localhost/.test(this.host)) {
			profile = path.resolve('../test-files/files');

			fs.stat(profile, (error, stat) => {
				if (error) {
					throw new Error('It seems you forgot to install test files:\n' +
						'"git clone ssh://git@stash.mail.ru:2222/qa/test-files.git"');
				}
			});
		}

		return path.join(profile, name);
	},

	/**
	 * Название браузера
	 *
	 * @type {string}
	 */
	get browser () {
		return browser.desiredCapabilities.browserName;
	},

	/**
	 * Название платформы
	 *
	 * @type {string}
	 */
	get platform () {
		let status = browser.status();

		return browser.desiredCapabilities.platform || status.value.os.name;
	},

	/**
	 * Тестовый урл
	 *
	 * @type {string}
	 */
	get host () {
		return browser.options.hostname;
	}
};
