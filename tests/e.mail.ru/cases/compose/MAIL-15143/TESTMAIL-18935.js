'use strict';

let { options = {
	name: 'Написание письма. НЕ AJAX. Проверка соответствия подписи с подписью в настройках',
	noajax: true
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let Messages = require('../../../steps/messages');
let Signature = require('../../../steps/settings/signature');

let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();

let ComposeEditorControlsSteps = require('../../../steps/compose/editorControls');
let composeEditorControls = new ComposeEditorControlsSteps();

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbarSteps = new MessagesToolbarSteps();

let composeEditorStore = require('../../../store/compose/editor');

let actions = require('../../../utils/actions');

describe(() => {
	before(() => {
		Messages.auth();

		if (options.compose2) {
			Messages.features([
				'compose2'
			]);
		}
	});

	composeEditorStore.signatures.forEach(({sign, text}) => {
		it(options.name + ': ' + sign, () => {
			Messages.open();

			actions.setSignatures([sign]);

			if (options.noajax) {
				Compose.open();
			} else {
				messagesToolbarSteps.clickButton('compose');
				Compose.wait();
			}

			composeEditor.hasMessage(sign);

			composeEditor.writeMessage('');
			composeEditorControls.toggleSignature();
			composeEditorControls.isVisibleSignature();
			composeEditorControls.hasSignature(text);

			Signature.open();
			Signature.hasSignature(sign);
		});
	});
});
