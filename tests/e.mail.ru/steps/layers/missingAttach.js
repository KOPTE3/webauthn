'use strict';

const assert = require('assert');

let LayerSteps = require('../../steps/layers');
let MissingAttachLayer = require('../../pages/layers/missingAttach');

class MissingAttachLayerSteps extends LayerSteps {
	constructor () {
		super();

		this.layer = new MissingAttachLayer();
	}
}

module.exports = new MissingAttachLayerSteps();
