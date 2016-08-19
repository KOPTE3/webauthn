'use strict';

let Signature = require('../../../../steps/settings/signature');
let ComposeEditorControlsSteps = require('../../../../steps/compose/editorControls');
let Compose2EditorSteps = require('../../../../steps/compose2/editor');

let composeEditorControls = new ComposeEditorControlsSteps();
let compose2Editor = new Compose2EditorSteps();

const text = 'Текст подписи';
const filename = 'jpg.jpg';

module.exports = (open, close, signatures) => {
	open();

	compose2Editor.hasInline();

	composeEditorControls.toggleSignature();
	composeEditorControls.isVisibleSignature();
	composeEditorControls.clickSignature(1);

	compose2Editor.noInline();
	compose2Editor.messageContains(text);
};
