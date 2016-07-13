'use strict';

let FolderLayerSteps = require('./');
let FolderAddLayer = require('../../../pages/layers/folder/add');

class FolderAddLayerSteps extends FolderLayerSteps {
	constructor () {
		super();

		this.layer = new FolderAddLayer();
	}
}

module.exports = FolderAddLayerSteps;
