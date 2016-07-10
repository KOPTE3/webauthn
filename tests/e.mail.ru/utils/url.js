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
	 * Возвращает адрес запроса
	 *
	 * @param {string} path
	 * @param {Object} [query]
	 * @returns {string}
	 */
	request (path, query = {}) {
		let params = Object.keys(query);

		if (params.length) {
			return `${path}?${this.query(query)}`;
		}

		return path;
	}
};
