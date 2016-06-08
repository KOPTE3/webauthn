'use strict';

let child_process = require('child_process');

let grunt = require('grunt'),
	phantom = require('phantomjs-prebuilt'),
	chai = require('wdio-chai-plugin'),
	wait = require('./plugins/wait');

/** @namespace browser */
exports.config = {
	/*
	 * Настройки, с которыми запущен Selenium-сервер
	 */
	host: 'localhost',
	port: 4444,
	path: '/wd/hub',

	/* Базовый адрес тестирования */
	baseUrl: 'https://mezin.win105.dev.mail.ru/',

	/* Доступные значения: silent, verbose, command, data, result, error */
	logLevel: 'silent',

	/*
	 * Опция позволяет отладчику остановить выполнение тестов
	 * в месте вызова инструкции debugger.
	 * Для использования этой опции требуется наличие пакета node-inspector
	 */
	debug: false,

	/* Количество инстансов параллельного запуска тестов */
	// maxInstances: 1,

	/* Доступные значения: cucumber, mocha, jasmine */
	framework: 'mocha',

	mochaOpts: {
		ui: 'bdd'
	},

	/* Для реппортера Allure требуется наличие установленного плагина в CI */
	reporters: ['dot', 'junit'],

	reporterOptions: {
		outputDir: './cache/specs/reports'
	},

	/* Директория, куда будут складываться скриншоты */
	screenshotPath: './cache/specs/shots',

	/* Директория, куда будут складываться логи */
	logfile: './cache/specs/logs',

	/*
	 * Список файлов с тестами.
	 * Порядок файлов сохраняется, дубликаты исключаются
	 */
	specs: [
		'./domains/**/index.js'
	],

	/* suites: { }, */

	/*
	 * Обратие внимание на то, что браузеры запускаются параллельно
	 * Конфигуратор https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
	 *
	 * Внутри каждой группы доступны поля specs и exclude
	 *
	 * Опция pageLoadStrategy позволяет начать выполнение тестов сразу
	 * после построения DOM-дерева (document.readyState == 'interactive')
	 * В Selenium до версии 2.46 использовалось именование pageLoadingStrategy
	 *
	 * Если требуется установить какой-то кастомный браузер
	 * (например, для тестирования игрового центра), то нужно указать путь:
	 *
	 * chromeOptions: {
	 *     binary: 'Electron.app/Contents/MacOS/Electron'
	 * }
	 *
	 * Список стандартных опций WebDriver
	 * https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
	 */
	capabilities: [
		{
			browserName: 'phantomjs',

			// http://phantomjs.org/api/command-line.html
			'phantomjs.binary.path': phantom.path,

			'phantomjs.cli.args': [
			// 	// '--debug=yes',
				'--ignore-ssl-errors=yes'
			]
		}
	],

	before (capabilities, specs) {
		chai(browser);
		wait(browser);
		grunt.log.ok('Running tests...');
	},

	after (result, capabilities, specs) {
		grunt.log.ok('Finished up the tests');
	}
};
