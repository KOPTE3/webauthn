'use strict';

let Messages = require('../../steps/messages');
let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let ComposeFieldsStore = require('../../store/compose/fields');
let messagesToolbarSteps = require('../../steps/messages/toolbar');

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('TESTMAIL-31554: AJAX. Написание письма. Забытое вложение.' +
' Проверить закрытие попапа по крестику ', () => {
	before(() => {
		Compose.auth();
	});

	it('Проверяем закрытие леера', () => {
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
		composeEditor.writeMessage(text);
		composeControls.send();
		missingAttachLayer.wait();
		missingAttachLayer.close();
		missingAttachLayer.shouldBeClosed();
	});
});
