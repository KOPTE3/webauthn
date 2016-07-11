'use strict';

let Compose = require('../../steps/compose');
let SentPage = require('../../steps/sent');
let ComposeFieldsStore = require('../../store/compose/fields');
let ComposeFields = require('../../steps/compose/fields');
let ComposeEditor = require('../../steps/compose/editor');
let ComposeControls = require('../../steps/compose/controls');
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let SentPage = require('../../steps/sent');
let composeFieldsStore = require('../../store/compose/fields');

let composeFields = new ComposeFields();
let composeFieldsStore = new ComposeFieldsStore();
let composeEditor = new ComposeEditor();
let composeControls = new ComposeControls();
let missingAttachLayer = new MissingAttachLayer();

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('TESTMAIL-31553: НЕ AJAX. Написание письма. Забытое вложение. ' +
'Проверить отправку письма по клику на кнопку "Всё равно отправить"', () => {
	before(() => {
		Compose.auth();
	});

	it('Проверям что сообщение было отправленно', () => {
		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Compose.open();

		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', composeFieldsStore.fields.to);
		composeEditor.writeMessage(text);

		composeControls.send();
		missingAttachLayer.wait();
		missingAttachLayer.apply();
		missingAttachLayer.shouldBeClosed();
		SentPage.isVisible();
	});
});
