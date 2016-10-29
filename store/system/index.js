'use strict';

let fs = require('fs');
let path = require('path');
let platform = require('platform');

let fileService = require('@qa/files-service')({
	basepath: 'files'
});


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

		return fileService(name);
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
	 * Размер вьюпорта
	 *
	 * @type {Object}
	 */
	get viewport () {
		return browser.getViewportSize();
	},

	/**
	 * Название платформы
	 *
	 * @deprecated — используйте свойство agent
	 * @type {string}
	 */
	get platform () {
		let status = browser.execute(function () {
			return window.navigator.platform;
		});

		return browser.desiredCapabilities.platform || status.value;
	},

	/**
	 * Получение данных о браузере и его окружении из UA
	 *
	 * @type {string} — name, version, layout, os, description
	 */
	get agent () {
		let userAgent = browser.execute(function () {
			return window.navigator.userAgent;
		});

		return platform.parse(userAgent);
	},

	/**
	 * Тестовый хост
	 *
	 * @type {string}
	 */
	get host () {
		return browser.options.hostname;
	},

	/**
	 * Тестовый хост
	 *
	 * @type {string}
	 */
	get baseUrl () {
		return browser.options.baseUrl;
	}
};
