'use strict';

/** Модуль для работы с фичами */
class Features {
	/**
	 * Примениение фичи
	 *
	 * @param {string} name
	 * @param {string} value
	 * @returns {boolean}
	 */
	use (name, value) {
		return browser.waitUntil(function async () {
			return browser.executeAsync(function (name, value, resolve) {
				require('features', function (features) {
					var actual = features.use(name, value);

					resolve(actual);
				});
			}, name, value);
		});
	}

	/**
	 * Выключение фичи
	 *
	 * @param {string} name
	 * @returns {boolean}
	 */
	off (name) {
		return browser.waitUntil(function async () {
			return browser.executeAsync(function (name, resolve) {
				try {
					if (window.patron) {
						var features = window.patron.FEATURES;

						features = features.split(/ /);

						window.patron.FEATURES = features.filter(function (feature) {
							return feature.indexOf(name) !== 0;
						});

						resolve(true);
					}
				} catch (error) { }
			}, name);
		});
	}

	/**
	 * Проверка доступности фичи
	 *
	 * @param {string} name
	 * @returns {boolean}
	 */
	has (name) {
		return browser.waitUntil(function async () {
			return browser.executeAsync(function (name, resolve) {
				require('features', function (features) {
					var actual = features.has(name);

					resolve(actual);
				});
			}, name);
		});
	}

	/**
	 * Получение данных
	 *
	 * @param {string} name
	 * @returns {Object|undefined}
	 */
	get (name) {
		return browser.waitUntil(function async () {
			return browser.executeAsync(function (name, resolve) {
				require('features', function (features) {
					var actual = features.get(name);

					resolve(actual);
				});
			}, name);
		});
	}
}

module.exports = Features;
