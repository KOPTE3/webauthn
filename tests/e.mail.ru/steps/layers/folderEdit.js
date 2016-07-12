'use strict';

let assert = require('assert');

let LayerSteps = require('../../steps/layers');
let FolderEditLayer = require('../../pages/layers/folderEdit');

class FolderEditLayerSteps extends LayerSteps {
	constructor () {
		super();

		this.layer = new FolderEditLayer();
	}

	setFieldValue (name, value) {
		this.layer.setFieldValue(name, value);
	}

	setDropdownValue (name, value) {
		this.layer.setDropdownValue(name, value);
	}

	apply () {
		this.layer.apply();
	}
}

module.exports = FolderEditLayerSteps;
