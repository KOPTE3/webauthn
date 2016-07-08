'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let ComposeFieldsStore = require('../../store/compose/fields');

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('TESTMAIL-31551: НЕ AJAX. Забытое вложение. Проверить закрытие попапа ' +
	'по крестику', () => {
	before(() => {
		Compose.auth();
	});

	it('Проверяем закрытие леера', () => {
		let { fields } = new ComposeFieldsStore();

		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Compose.open();

		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(text);
		composeControls.send();
		missingAttachLayer.wait();
		missingAttachLayer.close();
		missingAttachLayer.shouldBeClosed();
	});
});
