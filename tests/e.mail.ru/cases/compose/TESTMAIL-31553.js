'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let SentPage = require('../../steps/sent');
let ComposeFieldsStore = require('../../store/compose/fields');

let composeFieldsStore = new ComposeFieldsStore();

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('TESTMAIL-31553: НЕ AJAX. Написание письма. Забытое вложение. ' +
'Проверить отправку письма по клику на кнопку "Всё равно отправить"', () => {
	before(() => {
		Compose.auth();
	});

	it('проверям что сообщение было отправленно', () => {
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
