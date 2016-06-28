'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');

describe('TESTMAIL-31547: НЕ AJAX. Написание письма. Забытое вложение.', () => {
	before(Compose.auth);

	beforeEach(() => {
		Compose.addFeature('check-missing-attach');
		Compose.addFeature('disable-ballons');
		Compose.addFeature('no-collectors-in-compose');

		Compose.open();
	});

	afterEach(() => {
		missingAttachLayer.close();
		composeControls.cancel();
	});

	composeEditorStore.letters.forEach(text => {
		it(text, () => {
			composeFields.setFieldValue('subject', 'check attach');
			composeFields.setFieldValue('to', 'i.burlak@corp.mail.ru');
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
