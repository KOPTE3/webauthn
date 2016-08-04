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
		let result = browser.executeAsync(
			/*eslint-disable */
			function registerLogger (path, resolve) {
				patron.ajaxStack = patron.ajaxStack || [];
				$(document).ajaxComplete(function (event, xhr, settings) {
					if (settings.url.contains(path)) {
						patron.ajaxStack.push({
							path: path,
							xhr: xhr,
							event: event,
							settings: settings
						});
					}
				});

				resolve(true);
			}, path
			/*eslint-enable */
		);

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
		let result = browser.executeAsync(
			function captureAjaxInfo (path, resolve) {
				var result = patron.ajaxStack.filter(function (entity) {
					return entity.path === path;
				});

				resolve(result);
			}, path
		);

		return {
			isOK: result.state === 'success' && result.value,
			value: result.value
		};
	}
};
