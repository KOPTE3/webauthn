'use strict';

let assert = require('assert');

let LayerSteps = require('../../steps/layers');
let FolderAddLayer = require('../../pages/layers/folderAdd');

class FolderAddLayerSteps extends LayerSteps {
	constructor () {
		super();

		this.layer = new FolderAddLayer();
	}
}

module.exports = new FolderAddLayerSteps();
