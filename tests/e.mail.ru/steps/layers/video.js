'use strict';

let assert = require('assert');

let LayerSteps = require('../../steps/layers');
let VideoPage = require('../../pages/layers/video');

/** Работа с леером проигрывания видео на чтении письма */
class VideoSteps extends LayerSteps {
	constructor () {
		super();

		this.layer = new VideoPage();
	}

	/**
	 * Проверить, что видео стартует с указанного времени
	 * @param {number|string} time
	 */
	checkVideoStartTime (time) {
		let url = this.layer.getVideoUrl();
		let actual = url.indexOf(`&start=${time}`) >= -1;

		assert(actual, `Видео начинается не с ${time}, урл ${url}`);
	}
}

module.exports = VideoSteps;
