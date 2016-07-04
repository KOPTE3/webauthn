'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');

let composeFieldsStore = new ComposeFieldsStore();

describe('TESTMAIL-31547: НЕ AJAX. Написание письма. Забытое вложение.', () => {
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

	afterEach(() => {
		missingAttachLayer.close();
		composeControls.cancel();
	});

	composeEditorStore.lettersWithAttach.forEach(text => {
		it(text, () => {
			composeFields.setFieldValue('subject', 'check attach');
			composeFields.setFieldValue('to', composeFieldsStore.fields.to);

			try {
				composeEditor.writeMessage(text);
				composeControls.send();
				missingAttachLayer.show();
			} catch (error) {
				console.log(error);
			}
		});
	});
});
