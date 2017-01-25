'use strict';

let { execSync } = require('child_process');
let { Readable } = require('stream');
let path = require('path');
let debug = require('debug')('@qa/yoda');

let ESLint;

try {
	ESLint = require('eslint').CLIEngine;
}
catch (error) {
	debug('started without ESLint');
}

/**
 * Сервис валидации файлов
 *
 * @param {Array} files — список файлов
 * @returns {number} — возвращает количество ошибок
 */
module.exports = files => {
	let options = {
		// Использовать кеширование результатов
		cache: true,

		// Выбор форматирования
		format: 'node_modules/eslint-friendly-formatter',

		// Автоматическое исправление замечаний
		fix: true,

		// Список расширений, для которых будет выполняться проверка
		extensions: ['.js']
	};

	let lint = new ESLint(options);

	// Если список файлов не задан, то берем из диффа
	if (!files.length) {
		files = execSync('git diff --relative --name-only --diff-filter=AM HEAD', {
			encoding: 'utf8'
		});

		// Преобразуем строку в массив списка файлов
		files = files.split(/\n/);

		// Игнорируем пробельные символы и не интересные для нас расширения
		// См. https://github.com/eslint/eslint/issues/7939
		files = files.filter(file => {
			let { ext } = path.parse(file);

			return file.trim() && options.extensions.includes(ext);
		});
	}

	debug('modified files:', files);

	let report = lint.executeOnFiles(files);
	let stream = new Readable();

	// Помогаем исправить замечения
	ESLint.outputFixes(report);

	let formatter = lint.getFormatter(lint.options.format);

	stream.push(formatter(report.results));
	stream.push(null);
	stream.pipe(process.stdout);

	return report.errorCount;
};
