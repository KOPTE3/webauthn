'use strict';

let Signature = require('../../../../steps/settings/signature');
let Compose2EditorSteps = require('../../../../steps/compose2/editor');
let composeEditor = new Compose2EditorSteps();

module.exports = (signatures) => {
	Signature.open();
	Signature.hasWysiwyg();

	signatures.forEach(({text, filename}, index) => {
		if (index) {
			Signature.addSignature();
		}
		Signature.setSignature(text);

		if (filename) {
			Signature.attachInline(filename);
		}
	});

	Signature.save();
	Signature.open();

	signatures.forEach(({text, filename}, index) => {
		if (text) {
			composeEditor.messageContains(text, false, index);
		}

		if (filename) {
			composeEditor.hasInline(index);
		}
	});

};
