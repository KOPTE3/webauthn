'use strict';

let ComposeLayerSteps = require('./');
let ComposeEmptyTextLayer = require('../../../pages/layers/compose/emptyText');

class ComposeEmptyTextLayerSteps extends ComposeLayerSteps {
	constructor () {
		super();

		this.layer = new ComposeEmptyTextLayer();
	}
}

module.exports = ComposeEmptyTextLayerSteps;
