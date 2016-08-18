'use strict';

let Signature = require('../../../steps/settings/signature');
let Compose = require('../../../steps/compose');
let ComposeEditorSteps = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditorSteps();

let text = 'Текст подписи';

describe(() => {
	before(() => {
		Signature.auth();

		Signature.features([
			'wysiwyg-signature',
			'wysiwyg-signature-inline-images',
			'compose2-inlinefromeditor'
		]);

		Signature.open();
		Signature.hasWysiwyg();
	});

	it('Настройки. HTML подпись. Проверка сохранения отредактированной подписи ' +
		'(подпись одна, без картинки)', () => {
		Signature.setSignature(text);
		Signature.save();
		Compose.open();
		composeEditor.messageContains(text);
	});
});
