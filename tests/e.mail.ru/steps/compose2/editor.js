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

	hasInline () {
		let actual = this.composeEditor.hasInline();

		assert(actual, 'Инлайна нет');
	}

	noInline () {
		let actual = this.composeEditor.hasInline(true);

		assert(actual, 'Инлайн есть');
	}

	hasInlineInBlockQuote () {
		let actual = this.composeEditor.hasInlineInBlockQuote();

		assert(actual, 'Инлайна в цитате нет');
	}
}

module.exports = Compose2EditorSteps;
