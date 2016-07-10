'use strict';

/** Модуль для работы с Date */
module.exports = {
	/**
	 * Смещает текущее время
	 * @param {number} offset - секунды
	 */
	setTimeOffset (offset) {
		browser.execute(function (offset) {
			Date.setNow(Date.now() + (offset * 1000));
		}, offset);
	},

	/**
	 * Восстанавливает оригинальную дату
	 */
	resetTimeOffset () {
		browser.execute(function () {
			Date.setNow(new Date());
		});
	},

	/**
	 * Форматирует дату
	 * @param {string} mask - как выводить дату
	 * @param {number} time - дата в ms
	 * @returns {string}
	 */
	format (mask, time) {
		return browser.execute(function (mask, time) {
			return new Date(time || Date.now()).format(mask);
		}, mask, time).value;
	}
};
