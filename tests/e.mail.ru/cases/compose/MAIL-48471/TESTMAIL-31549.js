'use strict';

let Compose = require('../../../steps/compose');
let ComposeFields = require('../../../steps/compose/fields');
let ComposeEditor = require('../../../steps/compose/editor');
let ComposeControls = require('../../../steps/compose/controls');
let composeEditorStore = require('../../../store/compose/editor');
let SentPage = require('../../../steps/sent');
let composeFieldsStore = require('../../../store/compose/fields');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new ComposeControls();

describe('TESTMAIL-31549: НЕ AJAX. Написание письма. Забытое вложение. ' +
'Проверить отсутствие попапа при отправке ' +
'(тексты для которых не должен появляться попап)', () => {
	before(() => {
		Compose.auth();
	});

	it('Письмо должно отправится', () => {
		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Compose.open();

		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', composeFieldsStore.fields.to);
		composeEditor.writeMessage(composeEditorStore.texts.withoutAttach);
		composeControls.send();
		SentPage.isVisible();
	});
});
