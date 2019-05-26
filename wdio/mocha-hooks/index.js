const path = require('path');
const debug = require('debug')('@qa:yoda');

/**
 * Проверяем, что в конфиге добавлен сервис @qa/yoda/wdio/mocha-hooks/service.js
 */
const mochaHooksServiceModuleId = require.resolve('./service');
if (!require.cache[mochaHooksServiceModuleId]) {
	throw new Error('@qa/yoda/wdio/mocha-hooks/service.js not called. See @qa/yoda/wdio/mocha-hooks/README.md for more info');
}

const {context, file} = module.parent.context;
const {describe, before, after, beforeEach} = context;

/**
 * Восстанавливает заданный метод
 *
 * @param {Function} method
 * @param {string | Function} title
 * @param {Function} [callback]
 * @returns {string}
 */
function execute (method, title, callback) {
	const suiteTS = path.basename(file, '.ts');
	const suiteJS = path.basename(file, '.js');

	const suite = suiteTS.length < suiteJS.length ? suiteTS : suiteJS;

	debug('started test', suite);

	if (typeof callback === 'function') {
		if (/^\d+/.test(title)) {
			return method(title, callback);
		} else {
			return method(`${suite}: ${title}`, callback);
		}
	} else {
		return method(suite, title);
	}
}

/**
 * Добавляет анонимные блоки описания
 *
 * @param {string} [title]
 * @param {Function} callback
 * @returns {*}
 */
context.describe = context.context = function (title, callback) {
	return execute(describe, title, callback);
};

/**
 * Восстанавливаем describe.skip
 *
 * @param {string} [title]
 * @param {Function} callback
 * @returns {*}
 */
context.describe.skip = context.xdescribe = context.xcontext = function (title, callback) {
	return execute(describe.skip, title, callback);
};

/**
 * Восстанавливаем describe.only
 *
 * @param {string} [title]
 * @param {Function} callback
 * @returns {*}
 */
context.describe.only = function (title, callback) {
	return execute(describe.only, title, callback);
};

/**
 * Добавляем предупреждение о том, что нежелательно использовать хук before в тестах
 *
 * @param {Function} callback
 * @returns {*}
 */
context.before = function (callback) {
	console.warn('Использование хука `before` в тестах не рекомендуется. Вместо него используйте `beforeEach`');
	return before.apply(this, arguments);
};

/**
 * Добавляем предупреждение о том, что нежелательно использовать хук after в тестах
 *
 * @param {Function} callback
 * @returns {*}
 */
context.after = function (callback) {
	console.warn('Использование хука `after` в тестах не рекомендуется. Вместо него используйте `afterEach`');
	return after.apply(this, arguments);
};

/**
 * Пропускаем нестабильные тесты при включённой опции --stable
 *
 * @param {Function} callback
 * @returns {*}
 */
context.beforeEach = function (callback) {
	let filename = path.parse(file).name;
	let [filename1, filename2] = [
		path.basename(filename, '.ts'),
		path.basename(filename, '.js'),
	];

	let {stable = false, unstableCases = []} = context.browser.options;

	if (stable && (unstableCases.includes(filename1) || unstableCases.includes(filename2))) {
		context.context.skip();
	}

	return beforeEach.apply(this, arguments);
};

