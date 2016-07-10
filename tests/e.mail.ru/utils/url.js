'use strict';

let url = require('url');
let querystring = require('querystring');

/** Модуль для работы с URL */
class URL {
	/**
	 * Сериализует параметры запроса
	 *
	 * @see querystring.stringify
	 * @returns {string}
	 */
	static query () {
		return querystring.stringify(...arguments);
	}

	/**
	 * Десериализует параметры запроса
	 *
	 * @see querystring.parse
	 * @returns {Object}
	 */
	static parse () {
		return querystring.parse(...arguments);
	}

	/**
	 * Возвращает адрес запроса
	 *
	 * @param {string} path
	 * @param {Object} [query]
	 * @returns {string}
	 */
	static request (path, query = {}) {
		let params = Object.keys(query);

		if (params.length) {
			return `${path}?${URL.query(query)}`;
		}

		return path;
	}
}

module.exports = URL;
