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

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbarSteps = new MessagesToolbarSteps();

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('AJAX. Написание письма. Забытое вложение. ' +
'Проверить закрытие попапа по клику на кнопку "Прикрепить файл"', () => {
	before(() => {
		Compose.auth();
	});

	it('Проверяем закрытие леера', () => {
		let { fields } = composeFieldsStore;

		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Messages.open();
		messagesToolbarSteps.clickButton('compose');
		composeEditor.wait();

		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(text);
		composeControls.send();
		missingAttachLayer.wait();
		missingAttachLayer.cancel();
		missingAttachLayer.shouldBeClosed();
	});
});
