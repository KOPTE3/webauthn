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
		if (/127\.0\.0\.1|localhost/.test(this.host)) {
			let profile = path.resolve('files');

			fs.stat(profile, (error, stat) => {
				if (error) {
					throw new Error('It seems you forgot to install test files:\n' +
						'"git clone ssh://git@stash.mail.ru:2222/qa/files.git"');
				}
			});

			return path.join(profile, name);
		}

		if (/win/i.test(this.platform)) {
			return `C:\\Users\\tester\\Dropbox\\feta\\mail\\${name}`;
		}

		return `/var/lib/selenium/Dropbox/feta/mail/${name}`;
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
		let status = browser.execute(function () {
			return window.navigator.platform;
		});

		return browser.desiredCapabilities.platform || status.value;
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
