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

		page.open();
	});

	it('Проверить появление попапа при отправке текстов', () => {
		fields.setFieldValue('subject', 'check attach');
		fields.setFieldValue('to', 'i.burlak@corp.mail.ru');

		try {
			editor.writeMessage(EditorStore.letters[0]);
			controls.compose();
			popups.getPopup('missingAttach');
		} catch (error) {
			console.log(error);
		}
	});
});
