'use strict';

let Messages = require('../../steps/messages');
let ComposeFields = require('../../steps/compose/fields');
let composeFields = new ComposeFields();

let ComposeEditor = require('../../steps/compose/editor');
let composeEditor = new ComposeEditor();

let ComposeControls = require('../../steps/compose/controls');
let composeControls = new ComposeControls();

let SentPage = require('../../steps/sent');
let composeEditorStore = require('../../store/compose/editor');
let composeFieldsStore = require('../../store/compose/fields');

let MessagesToolbarSteps = require('../../steps/messages/toolbar');
let messagesToolbarSteps = new MessagesToolbarSteps();

describe('TESTMAIL-31541: AJAX аписание письма. Забытое вложение. Проверить ' +
	'отсутствие попапа при отправке ' +
	'(тексты для которых не должен появляться попап)', () => {
	before(() => {
		Messages.auth();
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
		composeEditor.writeMessage(composeEditorStore.texts.withoutAttach);
		composeControls.send();
		SentPage.isVisible();
	});
});
