'use strict';

let Compose = require('../../../steps/compose');
let ComposeFields = require('../../../steps/compose/fields');
let ComposeEditor = require('../../../steps/compose/editor');
let ComposeControls = require('../../../steps/compose/controls');
let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let composeFieldsStore = require('../../../store/compose/fields');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new ComposeControls();
let missingAttachLayer = new MissingAttachLayer();

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('НЕ AJAX. Забытое вложение. Проверить закрытие попапа ' +
	'по крестику', () => {
	before(() => {
		Compose.auth();
	});

	it('Проверяем закрытие леера', () => {
		let { fields } = composeFieldsStore;

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
