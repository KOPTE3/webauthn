'use strict';

let TestTools = require('@qa/test-tools'),
	capabilities = require('@qa/wd-capabilities'),
	EMail = require('../e.mail.ru/config');

let support = new TestTools.Support();
let project = 'account.mail.ru';

/** @namespace browser **/
exports.config = support.extend(EMail.config, {
	/* Базовый адрес тестирования */
	baseUrl: `https://${project}`,

	reporterOptions: {
		outputDir: `./cache/tests/${project}/reports`
	},

	/* Директория, куда будут складываться скриншоты */
	// screenshotPath: `./cache/tests/${project}/shots`,

	/* Директория, куда будут складываться логи */
	logfile: `./cache/tests/${project}/logs`,

	/**
	 * Набор тестовых кейсов
	 *
	 * { <suite>: [ <files> ] }
	 */
	suites: support.suites(`tests/${project}/cases`),

	/*
	 * Обратие внимание на то, что браузеры запускаются параллельно
	 * Конфигуратор https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
	 *
	 * Внутри каждой группы доступны поля specs и exclude
	 *
	 * Список стандартных опций WebDriver и пр. см ниже по ссылке:
	 * @see https://stash.mail.ru/projects/QA/repos/wd-capabilities/browse
	 */
	capabilities: [
		capabilities.get('chrome')
	]
});
