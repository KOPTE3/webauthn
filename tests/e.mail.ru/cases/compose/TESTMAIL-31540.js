'use strict';

let Messages = require('../../steps/messages');
let Compose = require('../../steps/compose');
let ComposeFields = require('../../steps/compose/fields');
let ComposeEditor = require('../../steps/compose/editor');
let ComposeControls = require('../../steps/compose/controls');
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let messagesToolbarSteps = require('../../steps/messages/toolbar');
let composeEditorStore = require('../../store/compose/editor');
let composeFieldsStore = require('../../store/compose/fields');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new ComposeControls();
let missingAttachLayer = new MissingAttachLayer();

describe('TESTMAIL-31540: AJAX. Написание письма. Забытое вложение. ' +
'Проверить появление попапа при отправке текстов', () => {
	before(() => {
		Compose.auth();
	});

	it('Попап должен появится', () => {
		let { fields } = composeFieldsStore;

		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Messages.open();
		messagesToolbarSteps.clickButton('compose');

		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);
		composeControls.send();
		missingAttachLayer.wait();
		missingAttachLayer.close();
		composeControls.cancel();
	});
});
