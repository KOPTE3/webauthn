'use strict';

let Signature = require('../../../../steps/settings/signature');
let ComposeEditorControlsSteps = require('../../../../steps/compose/editorControls');
let Compose2EditorSteps = require('../../../../steps/compose2/editor');

let composeEditorControls = new ComposeEditorControlsSteps();
let compose2Editor = new Compose2EditorSteps();

const text = 'Текст подписи';
const filename = 'jpg.jpg';

module.exports = (options, signatures) => {
	let initSignIndex = signatures[1].isDefault ? 1 : 0;
	let nextSignIndex = initSignIndex ? 0 : 1;
	let initImage = signatures[initSignIndex].image;
	let nextImage = signatures[nextSignIndex].image;

	options.open();

	if (initImage) {
		compose2Editor.hasInline();
		compose2Editor.messageContains(filename + initSignIndex);
	} else {
		compose2Editor.messageContains(text);
	}

	composeEditorControls.toggleSignature();
	composeEditorControls.isVisibleSignature();
	composeEditorControls.clickSignature(nextSignIndex);

	if (options.quoteInline) {
		// В цитировании должна была остаться старая подпись
		if (initImage) {
			compose2Editor.blockQuoteContains(filename + initSignIndex);
			compose2Editor.hasInlineInBlockQuote();
		} else {
			compose2Editor.blockQuoteContains(text);
		}
	} else {
		compose2Editor.messageContains(initImage ? filename + initSignIndex : text, true);
	}

	if (nextImage) {
		compose2Editor.hasInline();
		compose2Editor.messageContains(filename + nextSignIndex);
	} else {
		compose2Editor.messageContains(text);
	}

	options.close();
};
