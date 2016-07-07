'use strict';


/**
 * Модуль для работы с Ajax запросами на страницах Mail.Ru
 */
class Ajax {


	/**
	 * Добавляем обработчик запроса
	 * @param  {string} path
	 * @return {Object}
	 */
	static registerLogger (path) {
		let result = browser.executeAsync(
			function registerLogger (path, done) {
				patron.ajaxStack = patron.ajaxStack || [];
				$(document).ajaxComplete(function (event, xhr, settings) {
					if (settings.url.contains(path)) {
						patron.ajaxStack.push({
							path,
							xhr,
							event,
							settings
						});
					}
				});

				done(true);
			}, path
		);

		return {
			isOK: result.state === 'success',
			value: result.value
		};
	}

	/**
	 * Получаем все запросы по пути
	 * @param  {string} path
	 * @return {Object}
	 */
	static getLoggerInfo (path) {
		let result = browser.executeAsync(
			function captureAjaxInfo (path, done) {
				var result = patron.ajaxStack.filter(function (entity) {
					return entity.path === path;
				});

				done(result);
			}, path
		);

		return {
			isOK: result.state === 'success' && result.value,
			value: result.value
		};
	}
}

module.exports = Ajax;
