'use strict';

let FolderLayerSteps = require('./');
let FolderEditLayer = require('../../../pages/layers/folder/edit');

class FolderEditLayerSteps extends FolderLayerSteps {
	constructor () {
		super();

		this.layer = new FolderEditLayer();
	}
}

module.exports = FolderEditLayerSteps;
