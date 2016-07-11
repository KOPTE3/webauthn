'use strict';

let TestTools = require('@qa/test-tools');

let support = new TestTools.Support();

/** Набор базовых методов */
module.exports = {
	/**
	 * Расширяет заданный объект
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @returns {Object}
	 */
	extend (to, from) {
		return support.extend(...arguments);
	}
};
