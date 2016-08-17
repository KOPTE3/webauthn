'use strict';

/**
 * Модуль для работы с Ajax запросами на страницах Mail.Ru
 */
module.exports = {

	/**
	 * Добавляет обработчик запроса
	 *
	 * @param  {string} path
	 * @returns {Object}
	 */
	registerLogger (path) {
		let result = browser.executeAsync(function (path, resolve) {
			patron.ajaxStack = patron.ajaxStack || [];

			$(document).ajaxComplete(function (event, xhr, settings) {
				patron.ajaxStack.push(settings.url);

				if (settings.url.indexOf(path) !== -1) {
					/* eslint-disable */
					patron.ajaxStack.push({
						path: path,
						xhr: xhr,
						event: event,
						settings: settings
					});
					/* eslint-enable */
				}
			});

			resolve(true);
		}, path);

		return {
			isOK: result.state === 'success',
			value: result.value
		};
	},

	/**
	 * Получаем все запросы по пути
	 * @param  {string} path
	 * @returns {Object}
	 */
	getLoggerInfo (path) {
		let result = browser.executeAsync(function (path, resolve) {
			var result = patron.ajaxStack.filter(function (request) {
				return request.path === path;
			});

			resolve(result);
		}, path);

		return {
			isOK: result.state === 'success' && result.value,
			value: result.value
		};
	}
};
