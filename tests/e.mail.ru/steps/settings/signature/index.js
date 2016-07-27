'use strict';

let assert = require('assert');

let Steps = require('../../../steps');
let SettingsSignaturePage = require('../../../pages/settings/signature');

class Signature extends Steps {

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new SettingsSignaturePage();
	}

	static createSignature () {
		this.page.createSignature(...arguments);
	}

	static removeAllSignatures () {
		this.page.removeAllSignatures();
	}

	static save () {
		this.page.clickControl('save');
	}
}

module.exports = Signature;
