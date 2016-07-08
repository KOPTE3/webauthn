'use strict';

let Compose = require('../../steps/compose');
let ComposeFields = require('../../steps/compose/fields');
let ComposeEditor = require('../../steps/compose/editor');
let СomposeControls = require('../../steps/compose/controls');
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let SentPage = require('../../steps/sent');
let ComposeFieldsStore = require('../../store/compose/fields');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new СomposeControls();
let missingAttachLayer = new MissingAttachLayer();

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
