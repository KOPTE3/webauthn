'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let SentPage = require('../../steps/sent');

describe('TESTMAIL-31541: аписание письма. Забытое вложение. Проверить ' +
	'отсутствие попапа при отправке ' +
	'(тексты для которых не должен появляться попап)', () => {
	before(() => {
		Compose.auth();
	});

	composeEditorStore.classifierTest.lettersWithoutAttach.forEach(function (text) {
		it('Попап должен появится', () => {
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
			SentPage.isVisible();
		});
	});
});
