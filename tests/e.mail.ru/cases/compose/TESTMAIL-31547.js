'use strict';

let Compose = require('../../steps/compose');
let ComposeFields = require('../../steps/compose/fields');
let ComposeEditor = require('../../steps/compose/editor');
let ComposeControls = require('../../steps/compose/controls');
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new ComposeControls();
let missingAttachLayer = new MissingAttachLayer();

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
