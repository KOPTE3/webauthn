'use strict';

let path = require('path');

let { context, file } = module.parent.context;
let { describe } = context;

/**
 * Добавляет анонимные блоки описания
 *
 * @param {string} [name]
 * @param {Function} callback
 * @returns {*}
 */
context.describe = function (name, callback) {
	let suite = path.basename(file, '.js');

	if (typeof callback === 'function') {
		return describe(`${suite}: ${name}`, callback);
	} else {
		return describe(suite, name);
	}
};

// Восстанавливаем методы
for (let method of ['skip', 'only']) {
	context.describe[method] = describe[method];
}
