'use strict';

let LayerSteps = require('../../../steps/layers');

class ComposeLayerSteps extends LayerSteps {

	setFieldValue (name, value) {
		this.layer.setFieldValue(name, value);
	}

	setDropdownValue (name, value) {
		this.layer.setDropdownValue(name, value);
	}
}

module.exports = ComposeLayerSteps;
