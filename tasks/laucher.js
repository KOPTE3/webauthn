'use strict'

let fs = require('fs');
let path = require('path');
let merge = require('deepmerge');
let Log = require('tir');
let debug = require('debug')('@qa:yoda');
let WebDriverIO = require('webdriverio');
let WebDriverIOUtils = require('@qa/wdio-utils');

let details = {
	/**
	 * Вывод логотипа
	 *
	 * @param {Object} grunt
	 */
	logo (grunt) {
		let file = path.join(__dirname, '../files/logo.txt');
		let stream = fs.createReadStream(file);

		stream.pipe(process.stdout);
	},

	/**
	 * Обрабатывает список опций из аргументов командной строки
	 *
	 * @param {Object} service — { file, data }
	 * @returns {Object}
	 */
	extend (service) {
		let wdio = new WebDriverIOUtils();

		let { file, data } = wdio.config({
			file: service.file
		});

		// Экспортируем путь к конфигурационному файлу
		service.file = file;

		for (let [flag, value] of Object.entries(service.data)) {
			// Для дублирующихся ключей берем значение крайнего
			if (Array.isArray(value)) {
				value.pop();
			}

			switch (flag) {
				// Алиас для baseUrl
				case 'url':
					service.data.baseUrl = value;

					break;

				// Просим сервер включить расширенный вывод логов
				case 'verbose':
					service.data.logLevel = 'verbose';

				// Опция debug имеет 3 назначения:
				// 1. Позволяет увеличить время отладки для browser.debug()
				// 2. Выводит дополнительную информации о процессе выполнения тестов
				case 'debug':
					if (value) {
						merge(service.data, {
							mochaOpts: {
								timeout: 15 * (60 * 1000)
							}
						});

						// Исключаем пересечение в названиях опций
						// Для отладки кода через node-inspector эту опцию следует задавать в
						// конфигурационном файле
						delete service.data.debug;
					}

					break;

				default:
					service.data[flag] = value;

					break;
			}
		}

		debug('config:', file);

		let { grep } = service.data;

		if (grep) {
			debug('filter:', grep);
		}

		let suites = {};

		for (let [suite, tests] of Object.entries(data.suites)) {
			if (tests.length) {
				suites[suite] = tests;
			}
		}

		debug('suites:', suites);
		debug('options:', service.data);

		return service;
	}
};

/**
 * Сервис запуска тестов
 *
 * @param {Object} options.data — данные, которые будут переданы в конфиг
 * @param {string} options.file — путь к файлу конфига
 */
module.exports = function (options) {
	let service = details.extend(options);

	details.logo();

	let launcher = new WebDriverIO.Launcher(service.file, service.data);

	return launcher.run()
		.then(code => {
			if (code !== 0) {
				return Log.error('Tests finished with unwanted exit code', code);
			}

			Log.info('All tests were finished up with exit code', code);
		},
		error => {
			Log.error('Something went wrong: \n%s \n%s', error,
				JSON.stringify(service, null, '\t'));
		});
};
