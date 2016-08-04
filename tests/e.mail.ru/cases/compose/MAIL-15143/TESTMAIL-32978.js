'use strict';

let { options = {
	name: 'Новое написание письма. AJAX. ' +
	'Проверить ссылку «Изменить подпись» в панели редактирования.',
	compose2: true
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let Messages = require('../../../steps/messages');
let Signature = require('../../../steps/settings/signature');

let ComposeEditor = require(`../../../steps/${composeFolder}/editor`);
let composeEditor = new ComposeEditor();

let ComposeEditorControlsSteps = require(`../../../steps/${composeFolder}/editorControls`);
let composeEditorControls = new ComposeEditorControlsSteps();

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbarSteps = new MessagesToolbarSteps();

let tabs = require('../../../utils/tabs');

describe(() => {
	before(() => {
		Messages.auth();

		if (options.compose2) {
			Messages.features([
				'compose2'
			]);
		}

		Messages.open();

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

		composeEditorControls.clickSignatureSettings();

		tabs.switchTab();
		Signature.wait();
	});
});
