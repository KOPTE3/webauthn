'use strict';

/**
 * Дожидается появления требуемого значения
 *
 * @param {string} value
 * @param {number} timeout — ms
 * @return {Object}
 */
module.exports = browser => {
	browser.addCommand('wait', function (value, timeout) {
		if (typeof value === 'function') {
			return this.waitUntil(...arguments);
		}
		else if (value.startsWith('http')) {
			return this.waitUntil(function () {
				return this.url((error, result) => result.value === value);
			}, timeout);
		}
		else {
			return this.waitForExist(...arguments);
		}
	});
};

