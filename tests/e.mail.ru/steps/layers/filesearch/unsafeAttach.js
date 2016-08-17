'use strict';

let assert = require('assert');

let Steps = require('../');
let Layer = require('../../../pages/layers/filesearch/unsafeAttach');

class UnsafeLayerSteps extends Steps {
	constructor () {
		super();
		this.layer = new Layer();
	}

	/**
	 * Метод кликает по галочке "согласен"
	 */
	clickAgree () {
		this.layer.clickAgree();
		assert(this.layer.isAgreed());
	}
}

module.exports = UnsafeLayerSteps;
