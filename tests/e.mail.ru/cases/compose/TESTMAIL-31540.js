'use strict';

let Messages = require('../../steps/messages');
let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let messagesToolbarSteps = require('../../steps/messages/toolbar');

let composeFieldsStore = new ComposeFieldsStore();

describe('TESTMAIL-31540: AJAX. Написание письма. Забытое вложение. ' +
'Проверить появление попапа при отправке текстов', () => {
	before(() => {
		Compose.auth();
	});

	beforeEach(() => {
		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Messages.open();
		messagesToolbarSteps.clickButton('compose');
	});

	it('попап должен появится', () => {
		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', composeFieldsStore.fields.to);
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);
		composeControls.send();
		missingAttachLayer.show();
		missingAttachLayer.close();
		composeControls.cancel();
	});
});
