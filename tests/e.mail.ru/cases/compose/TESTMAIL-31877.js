'use strict';

// Messages
let Messages = require('../../steps/messages');
let MessagesLettersSteps = require('../../steps/messages/letters');
let messagesLettersSteps = new MessagesLettersSteps();

// Message
let Message = require('../../steps/message');
let MessageFastReplySteps = require('../../steps/message/fastreply');
let messageFastReplySteps = new MessageFastReplySteps();
let MessageToolbarSteps = require('../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();

// Compose
let composeFieldsStore = require('../../store/compose/fields');
let composeEditorStore = require('../../store/compose/editor');

let ComposeEditor = require('../../steps/compose/editor');
let composeEditor = new ComposeEditor();

let ComposeFields = require('../../steps/compose/fields');
let composeFields = new ComposeFields();

// settings
let SettingsMessages = require('../../steps/settings/messages');
let SettingsMessagesForm = require('../../steps/settings/messages/form');
let settingsMessagesForm = new SettingsMessagesForm();

// sent pages
let SentPage = require('../../steps/sent');

// utils
let actions = require('../../utils/actions');


const subject = 'Тестовый текст';

describe('TESTMAIL-31877: НЕ AJAX. Ответ на письмо. Забытое вложение. Проверить' +
	' отсутствие попапа для быстрого ответа с текстом в цитате', done => {
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

		const { fields } = composeFieldsStore;

		SettingsMessages.open();

		settingsMessagesForm.toggleField('sendReplyIncludeMessage');
		settingsMessagesForm.save();

		actions.sendMessage(
			fields.to,
			fields.from,
			subject,
			composeEditorStore.texts.withAttach
		);

		Messages.features(features);
		Messages.open();
		messagesLettersSteps.openNewestLetter();
		Message.wait();

		messageFastReplySteps.clickButton('reply');
		composeEditor.wait();

		composeEditor.writeMessage('Тест письма');
		messageToolbarSteps.clickFastreplyButton('reply');
		SentPage.isVisible();
	});
});
