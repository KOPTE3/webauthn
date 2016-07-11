'use strict';

let assert = require('assert');

let LayerSteps = require('../../steps/layers');
let MultiAttachLayer = require('../../pages/layers/multiAttach');

class MultiAttachLayerSteps extends LayerSteps {
	constructor () {
		super();

		this.layer = new MultiAttachLayer();
	}
}

module.exports = MultiAttachLayerSteps;
