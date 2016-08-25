'use strict';

let Signature = require('../../../steps/settings/signature');
let Compose = require('../../../steps/compose');
let Messages = require('../../../steps/messages');
let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let ComposeEditorControlsSteps = require('../../../steps/compose/editorControls');

let messagesToolbar = new MessagesToolbarSteps();
let composeEditorControls = new ComposeEditorControlsSteps();

let {auth, resetSignatures} = require('./meta');

const filename = 'jpg.jpg';
const singature = '--';

describe(() => {
	before(() => {
		auth();
		resetSignatures();

		Signature.open();

		Signature.setSignature('');
		Signature.attachInline(filename);

		Signature.addSignature();
		Signature.setSignature('', 1);
		Signature.attachInline(filename, 1);

		Signature.save();
	});

	[true, false].forEach((ajax) => {
		it('Написание письма. HTML подпись. Проверка отображения в выпадающем ' +
			'меню смены подписи, когда в ящике две подписи только с картинками: ' +
			(ajax ? 'AJAX' : 'НЕ AJAX'), () => {
			if (ajax) {
				Messages.open();
				messagesToolbar.clickButton('compose');
				Compose.wait();
			} else {
				Compose.open();
			}

			composeEditorControls.toggleSignature();
			composeEditorControls.isVisibleSignature();

			[0, 1].forEach((index) => composeEditorControls.checkSignatureText(singature, index));
		});
	});


});
