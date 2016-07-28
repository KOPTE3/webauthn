'use strict';

let AliasLayerSteps = require('./');
let AliasAddLayer = require('../../../pages/layers/alias/add');

class AliasAddLayerSteps extends AliasLayerSteps {
	constructor () {
		super();

		this.layer = new AliasAddLayer();
	}

	fillCaptcha () {
		let captcha = this.layer.getCaptchaValue();

		this.setFieldValue('captcha', captcha);
	}

	getAlias () {
		let login = this.getFieldValue('login');
		let domain = this.getDropdownValue('domain');

		return `${login}${domain}`;
	}
}

module.exports = AliasAddLayerSteps;
