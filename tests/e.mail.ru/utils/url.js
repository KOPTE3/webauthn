'use strict';

let url = require('url');
let querystring = require('querystring');

/** Набор методов для работы с URL */
module.exports = {
	/**
	 * Сериализует параметры запроса
	 *
	 * @see querystring.stringify
	 * @returns {string}
	 */
	query () {
		return querystring.stringify(...arguments);
	},

	/**
	 * Десериализует параметры запроса
	 *
	 * @see querystring.parse
	 * @returns {Object}
	 */
	parse () {
		return querystring.parse(...arguments);
	},

	/**
	 * Формирует URL
	 *
	 * @param {string} source - исходный URL
	 * @param {Object} [add] - параметры которые добавить
	 * @param {Array} [remove] - параметры которые удалить
	 * @returns {string}
	 */
	format (source, add = {}, remove = []) {
		let data = url.parse(source);
		let query = this.parse(data.query);

		remove.forEach(name => {
			delete query[name];
		});

		Object.assign(query, add);

		let result = data.pathname;

		if (Object.keys(query).length) {
			result += `?${this.query(query)}`;
		}

		return result;
	}
};
