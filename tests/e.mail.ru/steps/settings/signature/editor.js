'use strict';

let assert = require('assert');

let Compose2EditorSteps = require('../../../steps/compose2/editor');
let SignatureEditor = require('../../../pages/settings/signature/editor');

/** Модуль для работы с шагами редактора страницы написания письма */
class SignatureEditorSteps extends Compose2EditorSteps {
	constructor (index = 0) {
		super();

		this.composeEditor = new SignatureEditor(index);
	}
}

module.exports = SignatureEditorSteps;
