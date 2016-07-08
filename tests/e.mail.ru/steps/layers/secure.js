'use strict';

let assert = require('assert');

let LayerSteps = require('../../steps/layers');
let LayerSecure = require('../../pages/layers/secure');

class LayerSecureSteps extends LayerSteps {
	constructor () {
		super();

		this.layer = new LayerSecure();
	}
}

module.exports = LayerSecureSteps;
