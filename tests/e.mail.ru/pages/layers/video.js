'use strict';

let Layers = require('../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class Video extends Layers {
	constructor () {
		super();
		this.locator = '.is-externalFlashPlayer_in';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		const container = this.locator;

		return this.extend(super.locators, {
			container,
			frame: `${container} iframe`
		});
	}

	/**
	 * Получить урл фрейма с видео
	 *
	 * @return {string}
	 */
	getVideoUrl () {
		return this.page.getAttribute(this.locators.frame, 'src');
	}
}

module.exports = Video;
