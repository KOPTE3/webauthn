import * as fs from 'fs';
import * as path from 'path';
import * as merge from 'deepmerge';
import * as Log from 'tir';
import * as Debug from 'debug';
import * as WebDriverIO from 'webdriverio';
import * as WebDriverIOUtils from '@qa/wdio-utils';

let debug = Debug('@qa:yoda');

interface Service {
	file: string;
	data: Yoda.Options;
}

interface Suites {
	[name: string]: string[];
}

let details = {
	/**
	 * Вывод логотипа
	 */
	logo () {
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
	extend (service: Service): Service {
		let wdio = new WebDriverIOUtils();

		let { file, data } = wdio.config({
			file: service.file
		});

		// Экспортируем путь к конфигурационному файлу
		service.file = file;

		for (let [ flag, value ] of Object.entries(service.data)) {
			// Для дублирующихся ключей берем значение крайнего
			if (Array.isArray(value)) {
				value.pop();
			}

			switch (flag) {
				// Алиас для baseUrl
				case 'url':
					service.data.baseUrl = value;
					break;

				// Параметры вывода отладочной информации в модуле debug
				case 'verbose':
					break;

				// Вывод логов селениума
				case 'log':
					service.data.logLevel = value === true ? 'verbose' : value;
					break;

				// Позволяет отлаживать тесты
				case 'debug':
					merge(service.data, {
						mochaOpts: {
							timeout: 15 * (60 * 1000)
						}
					});

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

		let suites: Suites = {};

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
 * @param {Object} options
 *      data — данные, которые будут переданы в конфиг
 *      file — путь к файлу конфига
 * @returns {Promise}
 */
module.exports = function<T> (options: Service): Promise<T> {
	let service = details.extend(options);

	details.logo();

	let launcher = new WebDriverIO.Launcher(service.file, service.data);

	return launcher.run()
		.then(code => {
			if (code === 0) {
				Log.info('All tests were successfully finished');
			} else {
				Log.error('Tests finished with unwanted exit code', code);
			}

			process.exit(code);
		},
		error => {
			Log.error('Something went wrong: \n%s \n%s', error,
				JSON.stringify(service, null, '\t'));

			process.exit(-1);
		});
};
