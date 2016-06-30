'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let ComposeFieldsStore = require('../../store/compose/fields');

let { fields } = new ComposeFieldsStore();

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('TESTMAIL-31551: НЕ AJAX. Забытое вложение. Проверить закрытие попапа ' +
	'по крестику', () => {
	before(Compose.auth);

	beforeEach(() => {
		Compose.addFeature('check-missing-attach');
		Compose.addFeature('disable-ballons');
		Compose.addFeature('no-collectors-in-compose');

		Compose.open();
	});

	it('проверяем закрытие леера', () => {
		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(text);
		composeControls.send();
		missingAttachLayer.show();
		missingAttachLayer.close();
		missingAttachLayer.shoulBeClosed();
	});
});
