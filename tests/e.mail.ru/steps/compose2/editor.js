'use strict';

let assert = require('assert');

let ComposeEditorSteps = require('../../steps/compose/editor');
let Compose2Editor = require('../../pages/compose2/editor');

/** Модуль для работы с шагами редактора страницы написания письма */
class Compose2EditorSteps extends ComposeEditorSteps {
	constructor () {
		super();

		this.composeEditor = new Compose2Editor();
	}
}

module.exports = Compose2EditorSteps;