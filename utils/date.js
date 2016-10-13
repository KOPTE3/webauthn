'use strict';

/** Модуль для работы с Date */
/** @namespace browser */
module.exports = {
	/**
	 * Смещает текущее время
	 * @param {number} offset - секунды
	 * @param {boolean} [relative] - прибавить к текущему
	 */
	setTimeOffset (offset, relative) {
		browser.execute(function (offset, relative) {
			Date.setNow(+(relative ? Date.getNow() : new Date()) + (offset * 1000));
		}, offset, relative);
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
