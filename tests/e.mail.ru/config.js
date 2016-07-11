'use strict';

let AccountManager = require('@qa/account-manager'),
	WebDriverAPI = require('@qa/wdio-api-mail.ru'),
	TestTools = require('@qa/test-tools'),
	capabilities = require('@qa/wd-capabilities');

let account = new AccountManager.Hooks();
let support = new TestTools.Support();
let project = 'e.mail.ru';

/** @namespace browser **/
exports.config = {
	/*
	 * Настройки с которыми запущен сервер Selenium
	 *
	 * Операционная система: Windows
	 * Список доступных браузеров: Chrome, Firefox, Opera, IE 11
	 * Грид: http://vagabond3.dev.mail.ru:4444/grid/console
	 *
	 * Операционная система: Linux
	 * Список доступных браузеров: Chrome, Firefox
	 * Грид: http://win110.dev.mail.ru:4444/grid/console
	 */
	host: 'localhost',
	port: 4444,
	path: '/wd/hub',

	/* Базовый адрес тестирования */
	baseUrl: `https://${project}`,

	/* Доступные значения: silent, verbose, command, data, result, error */
	logLevel: 'silent',

	/*
	 * Максимальное время на выполнение команды.
	 * Если какая-то из команд фреймворка не получит за это время результат,
	 * то выполнение тестов будет прервано.
	 */
	waitforTimeout: 30 * 1000,

	/* Максимальное время на выполнение повторного запроса. */
	connectionRetryTimeout: 30 * 1000,

	/* Количество инстансов параллельного запуска тестов */
	maxInstances: 1,

	/** Использовать синхронное API */
	// sync: true,

	/*
	 * Опция позволяет отладчику остановить выполнение тестов
	 * в месте вызова инструкции debugger.
	 * Для использования этой опции требуется наличие пакета node-inspector
	 */
	debug: false,

	services: ['selenium-standalone'],

	/* Доступные значения: cucumber, mocha, jasmine */
	framework: 'mocha',

	mochaOpts: {
		'ui': 'bdd',

		/* Количество попыток на выполнение теста, который не был пройден */
		'retries': 0,

		/** Включить профилирование (сильно увеличивает время выполения тестов) */
		// 'prof': true,

		/** Максимальное время на ожидание результата выполнения теста */
		'timeout': 15 * (60 * 1000),

		/** Показывать стек-трейс */
		'trace': true,
		'full-trace': true,

		/** Ругаться на вызов устаревших функций */
		'throw-deprecation': true,
		'trace-deprecation': true
	},

	/* Для реппортера Allure требуется наличие установленного плагина в CI */
	reporters: ['spec', 'junit'],

	/* Директории, куда будут складываться отчеты о прогонах */
	reporterOptions: {
		outputDir: `./cache/tests/${project}/reports`
	},

	/* Директория, куда будут складываться скриншоты */
	screenshotPath: `./cache/tests/${project}/shots`,

	/* Директория, куда будут складываться логи сервера */
	seleniumLogs: `./cache/tests/${project}/logs`,

	/*
	 * Список файлов, которые требуется запустить
	 * Этот набор запускается всегда независимо от секции <suite>
	 * Порядок файлов сохраняется, дубликаты исключаются
	 */
	// specs: [ ],

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
		// capabilities.get('phantomjs'),
		capabilities.get('chrome')
	],

	before (capabilities, specs) {
		let commands = new WebDriverAPI();

		commands.export('all');
	},

	afterSuite () {
		return account.discard();
	}
};

let { config } = exports;

if (/127\.0\.0\.1|localhost|::1/.test(config.host)) {
	config.mochaOpts.retries = 0;
} else {
	let index = config.services.includes('selenium-standalone');

	if (index) {
		config.services.splice(index, 1);
	}
}

exports.config = config;
