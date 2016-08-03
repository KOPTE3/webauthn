'use strict';

let { options = {
	name: 'Написание письма. НЕ AJAX. Работа кнопки "Подпись" в письме',
	noajax: true
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let Messages = require('../../../steps/messages');

let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();

let ComposeEditorControlsSteps = require('../../../steps/compose/editorControls');
let composeEditorControls = new ComposeEditorControlsSteps();

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbarSteps = new MessagesToolbarSteps();

let composeEditorStore = require('../../../store/compose/editor');

let actions = require('../../../utils/actions');

describe('', () => {
	before(() => {
		Messages.auth();

		if (options.compose2) {
			Messages.features([
				'compose2'
			]);
		}

		Messages.open();
		actions.setSignatures(composeEditorStore.signatures);

		if (options.noajax) {
			Compose.open();
		} else {
			messagesToolbarSteps.clickButton('compose');
			Compose.wait();
		}
	});

	it(options.name, () => {
		composeEditor.writeMessage('');
		composeEditorControls.toggleSignature();
		composeEditorControls.isVisibleSignature();

		composeEditorStore.signatures.forEach((signature) =>
			composeEditorControls.hasSignature(signature)
		);

		composeEditorControls.isSelectedSignature(composeEditorStore.signatures[0]);
		composeEditorControls.isSignatureHasSettingsLink();
	});
});
