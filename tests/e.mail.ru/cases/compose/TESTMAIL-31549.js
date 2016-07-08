'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let composeEditorStore = require('../../store/compose/editor');
let SentPage = require('../../steps/sent');
let ComposeFieldsStore = require('../../store/compose/fields');

let composeFieldsStore = new ComposeFieldsStore();

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
