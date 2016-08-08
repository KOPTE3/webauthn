'use strict';

let assert = require('assert');

let LayerSteps = require('../../steps/layers');
let MultiAttachLayer = require('../../pages/layers/multiAttach');

/**
 * Леер прикрепления из облака и почтофайлов.
 * Для его работы должна быть включена фича
 * Messages.features(['compose-popup-files']);
 */
class MultiAttachLayerSteps extends LayerSteps {
	constructor () {
		super();

		this.layer = new MultiAttachLayer();
	}

	/**
	 * Кликнуть на файл. Предполагается что файл лежит в корне облака
	 * @param {string} filename
	 */
	toggleCloudFile (filename) {
		this.layer.toggleCloudFile(filename);
	}
}

module.exports = MultiAttachLayerSteps;
