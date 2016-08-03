'use strict';

let Messages = require('../../../steps/messages');
let Compose = require('../../../steps/compose');

let ComposeFields = require('../../../steps/compose/fields');
let composeFields = new ComposeFields();

let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();

let ComposeControls = require('../../../steps/compose/controls');
let composeControls = new ComposeControls();

let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let missingAttachLayer = new MissingAttachLayer();

let composeFieldsStore = require('../../../store/compose/fields');

let SentPage = require('../../../steps/sent');

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbarSteps = new MessagesToolbarSteps();

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('AJAX. Написание письма. Забытое вложение. Проверить ' +
'отправку письма по клику на кнопку "Всё равно отправить"', () => {
	before(Compose.auth);

	it('Проверям что сообщение было отправленно', () => {
		let { fields } = composeFieldsStore;

		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Messages.open();
		messagesToolbarSteps.clickButton('compose');


		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(text);
		composeControls.send();
		missingAttachLayer.wait();
		missingAttachLayer.apply();
		missingAttachLayer.shouldBeClosed();
		SentPage.isVisible();
	});
});
