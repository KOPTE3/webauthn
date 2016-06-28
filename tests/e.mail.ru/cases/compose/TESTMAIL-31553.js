'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let SentPage = require('../../steps/sent');

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('TESTMAIL-31553: НЕ AJAX. Написание письма. Забытое вложение. ' +
'Проверить отправку письма по клику на кнопку "Всё равно отправить"', () => {
	before(Compose.auth);

	it('проверям что сообщение было отправленно', () => {
		try {
			Compose.addFeature('check-missing-attach');
			Compose.addFeature('disable-ballons');
			Compose.addFeature('no-collectors-in-compose');

			Compose.open();
			composeFields.setFieldValue('subject', 'check attach');
			composeFields.setFieldValue('to', 'i.burlak@corp.mail.ru');
			composeEditor.writeMessage(text);

			composeControls.send();
			missingAttachLayer.wait();
			missingAttachLayer.apply();
			missingAttachLayer.shoulBeClosed();
			SentPage.wait();
		} catch (error) {
			console.log(error);
		}
	});
});