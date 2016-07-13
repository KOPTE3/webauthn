'use strict';

// Messages
let Messages = require('../../steps/messages');
let messagesLettersSteps = require('../../steps/messages/letters');

// Message
let Message = require('../../steps/message');
let messageToolbarSteps = require('../../steps/message/toolbar');

// Compose
let ComposeFieldsStore = require('../../store/compose/fields');
let composeEditorStore = require('../../store/compose/editor');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');

// settings
let SettingsMessages = require('../../steps/settings/messages');
let settingsMessagesForm = require('../../steps/settings/messages/form');

// sent pages
let SentPage = require('../../steps/sent');

// utils
let actions = require('../../utils/actions');


const subject = 'Тестовый текст';

describe('TESTMAIL-32348:  НЕ AJAX чтения. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для полного ответа с текстом в цитате ' +
	'(текст для которого попап появляться не должен)', () => {
	before(() => {
		SettingsMessages.auth();
	});

	it('Попап не должен быть показан', () => {
		const features = [
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		];

		const { fields } = new ComposeFieldsStore();

		SettingsMessages.open();

		settingsMessagesForm.toggleField('sendReplyIncludeMessage');
		settingsMessagesForm.save();

		actions.sendMessage(
			fields.to,
			fields.from,
			subject,
			composeEditorStore.texts.withoutAttach
		);

		Messages.features(features);
		Messages.open();
		messagesLettersSteps.openNewestLetter();
		Message.wait();
		Message.refresh();

		messageToolbarSteps.clickButton('reply');
		composeEditor.wait();

		composeEditor.writeMessage('Тест письма');
		composeControls.send();
		SentPage.isVisible();
	});
});
