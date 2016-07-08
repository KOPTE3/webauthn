'use strict';

let Messages = require('../../steps/messages');
let Compose = require('../../steps/compose');
let ComposeFields = require('../../steps/compose/fields');
let ComposeEditor = require('../../steps/compose/editor');
let СomposeControls = require('../../steps/compose/controls');
let composeEditorStore = require('../../store/compose/editor');
let SentPage = require('../../steps/sent');
let ComposeFieldsStore = require('../../store/compose/fields');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new СomposeControls();

let composeFieldsStore = new ComposeFieldsStore();

describe('TESTMAIL-31549: НЕ AJAX. Написание письма. Забытое вложение. ' +
'Проверить отсутствие попапа при отправке ' +
'(тексты для которых не должен появляться попап)', () => {
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

	composeEditorStore.lettersWithoutAttach.forEach(text => {
		it(text, () => {
			composeFields.setFieldValue('subject', 'check attach');
			composeFields.setFieldValue('to', composeFieldsStore.fields.to);
			composeEditor.writeMessage(text);
			composeControls.send();
			SentPage.isVisible();
		});
	});
});
