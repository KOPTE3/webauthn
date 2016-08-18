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

	waitForInlineAttach (id) {
		return this.composeEditor.waitForInlineAttach(id);
	}

	hasInline (index = 0) {
		let result = this.composeEditor.hasInline(index);

		assert(result, 'Инлайна нет');
	}

	hasInlineInBlockQuote () {
		let result = this.composeEditor.hasInlineInBlockQuote();
		
		assert(result, 'Инлайна в цитате нет');
	}
}

module.exports = Compose2EditorSteps;
