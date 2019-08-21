import * as platform from 'platform';
import * as FileService from '@qa/file-service';
import { assertDefinedValue } from '../../utils/assert-defined';
import config from '../../config';

const fileService = FileService({
	basepath: 'files',
	baseUrl: config.files.baseUrl
});

/** Набор методов для работы с данными пользовательского окружения */
export default {
	/** Префикс ACL-безопасных тестовых аккаунтов */
	prefix: 'test.box_',

	/**
	 * Возвращает полный путь к файлу
	 *
	 * @see https://stash.mail.ru/projects/QA/repos/test-files
	 * @param {string} name
	 * @returns {string}
	 */
	file(name: string): string {
		return fileService(name);
	},

	/**
	 * Название браузера
	 *
	 * @type {string}
	 */
	get browser(): string {
		return assertDefinedValue(browser.desiredCapabilities.browserName);
	},

	/**
	 * Размер вьюпорта
	 *
	 * @type {Object}
	 */
	get viewport(): WebdriverIO.Client<WebdriverIO.Size> & WebdriverIO.Size {
		return browser.getViewportSize();
	},

	/**
	 * Название платформы
	 *
	 * @deprecated — используйте свойство agent
	 * @type {string}
	 */
	get platform(): string {
		const status = browser.execute(() => {
			return window.navigator.platform;
		});

		return browser.desiredCapabilities.platform || status.value;
	},

	/**
	 * Получение данных о браузере и его окружении из UA
	 *
	 * @type {Platform} — name, version, layout, os, description
	 */
	// @ts-ignore
	get agent(): Platform {
		const { value } = browser.execute(() => {
			return window.navigator.userAgent;
		});

		return platform.parse(value);
	},

	/**
	 * Тестовый хост
	 *
	 * @type {string}
	 */
	get host(): string {
		return assertDefinedValue(browser.options.hostname);
	},

	/**
	 * Тестовый хост
	 *
	 * @type {string}
	 */
	get baseUrl(): string {
		return assertDefinedValue(browser.options.baseUrl);
	}
};
