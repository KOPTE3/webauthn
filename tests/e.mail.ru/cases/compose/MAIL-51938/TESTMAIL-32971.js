'use strict';

let Signature = require('../../../steps/settings/signature');
let Compose = require('../../../steps/compose');
let ComposeEditorSteps = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditorSteps();

let actions = require('../../../utils/actions');

let {auth, resetSignatures} = require('./meta');

const text = 'Текст подписи';

describe(() => {
	before(() => {
		auth();
		resetSignatures();

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
