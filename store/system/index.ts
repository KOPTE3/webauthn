import * as fs from 'fs';
import * as path from 'path';
import * as platform from 'platform';
import * as FileService from '@qa/file-service';

let fileService = FileService({ basepath: 'files' });

/** Набор методов для работы с данными пользовательского окружения */
export default {
	/**
	 * Возвращает полный путь к файлу
	 *
	 * @see https://stash.mail.ru/projects/QA/repos/test-files
	 * @param {string} name
	 * @returns {string}
	 */
	file (name: string): string {
		return fileService(name);
	},

	/**
	 * Название браузера
	 *
	 * @type {string}
	 */
	get browser (): string {
		return browser.desiredCapabilities.browserName;
	},

	/**
	 * Размер вьюпорта
	 *
	 * @type {Object}
	 */
	get viewport (): WebdriverIO.Client<WebdriverIO.Size> & WebdriverIO.Size {
		return browser.getViewportSize();
	},

	/**
	 * Название платформы
	 *
	 * @deprecated — используйте свойство agent
	 * @type {string}
	 */
	get platform (): string {
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
	get agent (): string {
		let { value } = browser.execute(function () {
			return window.navigator.userAgent;
		});

		return platform.parse(value);
	},

	/**
	 * Тестовый хост
	 *
	 * @type {string}
	 */
	get host (): string {
		return browser.options.hostname;
	},

	/**
	 * Тестовый хост
	 *
	 * @type {string}
	 */
	get baseUrl (): string {
		return browser.options.baseUrl;
	}
};
