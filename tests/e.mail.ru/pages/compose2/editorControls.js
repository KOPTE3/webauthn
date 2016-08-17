'use strict';

let ComposeEditorControls = require('../compose/editorControls');

/** Модуль для работы с контролами страницы написания письма */
class Compose2EditorControls extends ComposeEditorControls {
	constructor () {
		super();
	}

	get locatorContainer () {
		return '.compose__toolbar-external';
	}

	get locators () {
		let container = this.locatorContainer;

		return this.extend(super.locators, {
			format: {
				inlineField: `${container} input[name="inlinefiles"]`
			}
		});
	}
}

module.exports = Compose2EditorControls;
