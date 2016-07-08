'use strict';

let Messages = require('../../steps/messages');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let SentPage = require('../../steps/sent');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let messagesToolbarSteps = require('../../steps/messages/toolbar');

describe('TESTMAIL-31541: AJAX аписание письма. Забытое вложение. Проверить ' +
	'отсутствие попапа при отправке ' +
	'(тексты для которых не должен появляться попап)', () => {
	before(() => {
		Messages.auth();
	});

	it('Попап должен появится', () => {
		let { fields } = new ComposeFieldsStore();

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
