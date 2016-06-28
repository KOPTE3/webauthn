'use strict';

let page = require('../../steps/compose');
let fields = require('../../steps/compose/fields');
let editor = require('../../steps/compose/editor');
let controls = require('../../steps/compose/controls');
let popups = require('../../steps/compose/popups');
let EditorStore = require('../../store/compose/editor');

describe('TESTMAIL-31547: НЕ AJAX. Написание письма. Забытое вложение.', () => {
	beforeEach(function () {
		page.auth();

		page.addFeature('check-missing-attach');
		page.addFeature('disable-ballons');
		page.addFeature('no-collectors-in-compose');

		page.open();
	});

	EditorStore.letters.forEach(function (text) {
		it(text, () => {
			fields.setFieldValue('subject', 'check attach');
			fields.setFieldValue('to', 'i.burlak@corp.mail.ru');

			try {
				editor.writeMessage(text);
				controls.send();
				popups.getPopup('missingAttach');
				popups.closePopup();
				controls.cancel();
			} catch (error) {
				console.log(error);
			}
		});
	});
});
