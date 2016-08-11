'use strict';

let password = require('zxcvbn');

module.exports = {
	/**
	 * Список предопределенных паролей
	 *
	 * @returns {Array}
	 */
	list: [
		'multipass',
		'YTgh763',
		'MULTIPASS',
		'123456',
		'123qweasd'
	],

	/**
	 * Возвращает пароль заданой сложности
	 *
	 * @param {number} score — сложность пароля (0 - 4)
	 * @return {string|undefined}
	 */
	get (score = 0) {
		return this.list.find(value => {
			let actual = password(value);

			if (score === actual.score) {
				return value;
			}
		});
	}
};
