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
	if (callback) {
		return describe(...arguments);
	} else {
		callback = name;
		name = path.basename(file, '.js');

		return describe(name, callback);
	}
};
