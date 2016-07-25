'use strict';

let LayerSteps = require('../../../steps/layers');

class FolderLayerSteps extends LayerSteps {

	setFieldValue (name, value) {
		this.layer.setFieldValue(name, value);
	}

	setDropdownValue (name, value) {
		this.layer.setDropdownValue(name, value);
	}

	setCheckboxValue (name, value) {
		this.layer.setCheckboxValue(name, value);
	}

	getFields () {
		return this.layer.getFields();
	}

	isVisible () {
		return this.layer.isVisible();
	}
}

module.exports = FolderLayerSteps;
