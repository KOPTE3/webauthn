'use strict';

let Compose = require('../../steps/compose');
let ComposeFields = require('../../steps/compose/fields');
let ComposeEditor = require('../../steps/compose/editor');
let СomposeControls = require('../../steps/compose/controls');
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let ComposeFieldsStore = require('../../store/compose/fields');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new СomposeControls();
let missingAttachLayer = new MissingAttachLayer();

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('TESTMAIL-31551: НЕ AJAX. Забытое вложение. Проверить закрытие попапа ' +
	'по крестику', () => {
	before(() => {
		Compose.auth();
	});

	beforeEach(() => {
		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Compose.open();
	});

	it('проверяем закрытие леера', () => {
		let { fields } = new ComposeFieldsStore();

		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(text);
		composeControls.send();
		missingAttachLayer.show();
		missingAttachLayer.close();
		missingAttachLayer.shouldBeClosed();
	});
});
