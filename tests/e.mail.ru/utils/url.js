'use strict';

let url = require('url');
let querystring = require('querystring');

class URL {
	/**
	 * Сериализует параметры запроса
	 *
	 * @static
	 * @see querystring.stringify
	 * @returns {string}
	 */
	static query () {
		return querystring.stringify(...arguments);
	}

	/**
	 * Десириализует параметры запроса
	 *
	 * @static
	 * @see querystring.parse
	 * @returns {Object}
	 */
	static parse () {
		return querystring.parse(...arguments);
	}

	/**
	 * Возвращает адрес запроса
	 *
	 * @static
	 * @param {string} path
	 * @param {Object} [query]
	 * @returns {string}
	 */
	static request (path, ...query) {
		if (query) {
			return `${path}?${URL.query(...query)}`;
		}

		return path;
	}
}

module.exports = URL;
