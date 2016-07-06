'use strict';

let Messages = require('../../steps/messages');
let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let SentPage = require('../../steps/sent');
let messagesToolbarSteps = require('../../steps/messages/toolbar');

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('TESTMAIL-31546: AJAX. Написание письма. Забытое вложение. Проверить ' +
'отправку письма по клику на кнопку "Всё равно отправить"', () => {
	before(Compose.auth);

	beforeEach(() => {
		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Messages.open();
		messagesToolbarSteps.clickButton('compose');
	});

	it('проверям что сообщение было отправленно', () => {
		let { fields } = new ComposeFieldsStore();

		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(text);
		composeControls.send();
		missingAttachLayer.wait();
		missingAttachLayer.apply();
		missingAttachLayer.shouldBeClosed();
		SentPage.isVisible();
	});
});
