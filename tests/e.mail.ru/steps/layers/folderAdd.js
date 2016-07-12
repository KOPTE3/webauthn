'use strict';

let assert = require('assert');

let LayerSteps = require('../../steps/layers');
let FolderAddLayer = require('../../pages/layers/folderAdd');

class FolderAddLayerSteps extends LayerSteps {
	constructor () {
		super();

		this.layer = new FolderAddLayer();
	}

	setFieldValue (name, value) {
		this.layer.setFieldValue(name, value);
	}

	setDropdownValue (name, value) {
		this.layer.setDropdownValue(name, value);
	}
}

module.exports = FolderAddLayerSteps;
