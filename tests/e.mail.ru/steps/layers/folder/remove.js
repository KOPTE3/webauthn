'use strict';

let FolderLayerSteps = require('./');
let FolderRemoveLayer = require('../../../pages/layers/folder/remove');

class FolderRemoveLayerSteps extends FolderLayerSteps {
	constructor () {
		super();

		this.layer = new FolderRemoveLayer();
	}
}

module.exports = FolderRemoveLayerSteps;
