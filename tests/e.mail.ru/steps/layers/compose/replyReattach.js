'use strict';

let ComposeLayerSteps = require('./');
let ComposeReplyReattachLayer = require('../../../pages/layers/compose/replyReattach');

class ComposeEmptyTextLayerSteps extends ComposeLayerSteps {
	constructor () {
		super();

		this.layer = new ComposeReplyReattachLayer();
	}
}

module.exports = ComposeEmptyTextLayerSteps;
