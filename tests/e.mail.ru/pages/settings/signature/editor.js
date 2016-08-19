'use strict';

let Compose2Editor = require('../../compose2/editor');

/** Модуль для работы с редактором страницы написания письма */
class SignatureEditor extends Compose2Editor {
	constructor (index = 0) {
		super();

		this.index = index;
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			editor:
				`.js-signature-container:nth-of-type(${this.index + 1}) .mceIframeContainer iframe`
		});
	}
}

module.exports = SignatureEditor;
