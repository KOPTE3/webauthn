'use strict';

/** Модуль для работы с Date */
class Date {
	/**
	 * Смещает текущее время
	 * @param {number} offset - секунды
	 */
	setTimeOffset (offset) {
		browser.execute(function (offset) {
			Date.setNow(Date.now() + (offset * 1000));
		}, offset);
	}

	/**
	 * Восстанавливает оригинальную дату
	 */
	resetTimeOffset () {
		browser.execute(function () {
			Date.setNow(new Date());
		});
	}
}

module.exports = new Date();
