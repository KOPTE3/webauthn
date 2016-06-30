'use strict';

let Messages = require('../../steps/messages');
let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let SentPage = require('../../steps/sent');
let ComposeFiledsStore = require('../../store/compose/fields');
let composeFiledsStore = new ComposeFiledsStore();

describe('TESTMAIL-31549: НЕ AJAX. Написание письма. Забытое вложение. ' +
'Проверить отсутствие попапа при отправке ' +
'(тексты для которых не должен появляться попап)', () => {
	before(Compose.auth);

	beforeEach(() => {
		Compose.addFeature('check-missing-attach');
		Compose.addFeature('disable-ballons');
		Compose.addFeature('no-collectors-in-compose');

		Compose.open();
	});

	composeEditorStore.lettersWithoutAttach.forEach(text => {
		it(text, () => {
			composeFields.setFieldValue('subject', 'check attach');
			composeFields.setFieldValue('to', composeFiledsStore.fields.to);
			composeEditor.writeMessage(text);
			composeControls.send();
			SentPage.isVisible();
		});
	});
});
