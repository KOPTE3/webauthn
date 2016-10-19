'use strict';

let path = require('path');

let WebDriverIOUtils = require('@qa/wdio-utils');
let jenkinsUtils = require('@qa/jenkins-utils');
let minimist = require('minimist');

// Из билда должны передаваться опции multiCoreLimit и axis
let options = minimist(process.argv.slice(2));

module.exports = {
	writeAxisFile () {
		let wdioUtils = new WebDriverIOUtils();

		// Получаем актуальные конфигурационные данные с учетом переменных окружения и опций,
		// с которыми был запущен билд
		let config = wdioUtils.config('./config.js');
		let { suites, reporterOptions } = config;

		// Получаем общее количество тестовых файлов, которые должны участвовать в прогоне
		let files = wdioUtils.files(suites);

		// Получаем список многопроцессорных групп — разбиваем список на равные части,
		// которые будут использованы для последовательного запуска
		let chunks = jenkinsUtils.chunkArray(files, options.multiCoreLimit || 24);

		// Путь, который будет использоваться для записи композитного файла
		// берем из родительской директории с отчетами о тестовом прогоне
		let { dir } = path.parse(reporterOptions.outputDir);

		jenkinsUtils.writeAxisFile(dir, chunks.length);
	}
};
