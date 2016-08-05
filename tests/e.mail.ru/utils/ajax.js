'use strict';

/**
 * Модуль для работы с Ajax запросами на страницах Mail.Ru
 */
module.exports = {

	/**
	 * Добавляет обработчик запроса
	 *
	 * @param {string} event — допустимые значения:
	 *                         complete, send, end, error, start, stop, success
	 * @param {string} path
	 * @see http://api.jquery.com/category/ajax/global-ajax-event-handlers
	 */
	registerLogger (event, path) {
		/* eslint-disable */
		browser.executeAsync(function (event, path, resolve) {
			event = event.replace(/^[a-z]/, function (letter) {
				return letter.toUpperCase();
			});

			patron.ajaxStack = patron.ajaxStack || [];

			$(document).on(`ajax${event}`, function (event, xhr, settings) {
				patron.ajaxStack.push(settings.url);

				if (settings.url.indexOf(path) !== -1) {
					patron.ajaxStack.push({
						path: path,
						xhr: xhr,
						event: event,
						settings: settings
					});
				}
			});

			resolve(true);
		}, event, path);
		/* eslint-enable */
	},

	/**
	 * Получаем все запросы по пути
	 * @param {string} path
	 * @returns {Object}
	 */
	getLoggerInfo (path) {
		let result = browser.executeAsync(function (path, resolve) {
			var result = patron.ajaxStack.filter(function (request) {
				return request.path === path;
			});

			resolve(result);
		}, path);

		return result.value;
	}
};
