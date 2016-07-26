'use strict';

let LayerSteps = require('../../../steps/layers');

class AliasLayerSteps extends LayerSteps {

	setFieldValue (name, value) {
		this.layer.setFieldValue(name, value);
	}

	getFieldValue (name) {
		return this.layer.getFieldValue(name);
	}

	getDropdownValue (name) {
		return this.layer.getDropdownValue(name);
	}
}

module.exports = AliasLayerSteps;
