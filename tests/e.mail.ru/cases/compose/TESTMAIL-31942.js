'use strict';

// Messages
let Messages = require('../../steps/messages');
let messagesLettersSteps = require('../../steps/messages/letters');

// Message
let Message = require('../../steps/message');
let messagefastreplySteps = require('../../steps/message/fastreply');
let messageToolbarSteps = require('../../steps/message/toolbar');

// Compose
let ComposeFieldsStore = require('../../store/compose/fields');
let composeEditorStore = require('../../store/compose/editor');
let composeEditor = require('../../steps/compose/editor');
let composeFields = require('../../steps/compose/fields');

// layers
let missingAttachLayer = require('../../steps/layers/missingAttach');

// utils
let actions = require('../../utils/actions');


const subject = 'Тестовый текст';

describe('TESTMAIL-31942 НЕ AJAX. Ответ на письмо. Забытое вложение. Проверить' +
' появление попапа для быстрой пересылки с текстом и без аттача', done => {
	before(() => {
		Messages.auth();
	});

	it('Попап должен быть показан', () => {
		const features = [
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		];

		const { fields } = new ComposeFieldsStore();

		Messages.open();

		actions.sendMessage(
			fields.to,
			fields.from,
			subject,
			composeEditorStore.texts.withAttach
		);

		Messages.features(features);
		Messages.open();
		messagesLettersSteps.openNewestLetter();

		Message.features(features);
		Message.refresh();

		messagefastreplySteps.clickButton('forward');
		composeEditor.wait();

		composeFields.setFieldValue('subject', subject);
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage('Тест письма');

		messageToolbarSteps.clickFastreplyButton('resend');
		missingAttachLayer.wait();

		missingAttachLayer.close();
		messageToolbarSteps.clickFastreplyButton('cancel');
	});
});
