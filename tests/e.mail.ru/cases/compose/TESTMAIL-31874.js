'use strict';

// messages
let Messages = require('../../steps/messages');
let MessagesLettersSteps = require('../../steps/messages/letters');
let messagesLettersSteps = new MessagesLettersSteps();

// message
let MessageFastReplySteps = require('../../steps/message/fastreply');
let messageFastReplySteps = new MessageFastReplySteps();
let MessageToolbarSteps = require('../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();

// compose
let Compose = require('../../steps/compose');
let ComposeFields = require('../../steps/compose/fields');
let composeFields = new ComposeFields();

let ComposeEditor = require('../../steps/compose/editor');
let composeEditor = new ComposeEditor();

let composeEditorStore = require('../../store/compose/editor');
let composeFieldsStore = require('../../store/compose/fields');

// layers
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let missingAttachLayer = new MissingAttachLayer();

let actions = require('../../utils/actions');

const text = 'Тестовый текст';
const subject = 'Тест';

describe('TESTMAIL-31874: Ответ на письмо. Забытое вложение. Проверить появление ' +
' попапа для быстрого ответа с текстом и без аттача', done => {
	before(Compose.auth);

	it('Попап появился', () => {
		let { fields } = composeFieldsStore;

		Messages.open();

		actions.sendMessage(
			fields.to,
			fields.from,
			subject,
			text
		);

		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Messages.open();

		messagesLettersSteps.openNewestLetter();
		messageFastReplySteps.clickButton('reply');

		composeEditor.wait();
		composeFields.setFieldValue('subject', 'check attach');
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);

		messageToolbarSteps.clickFastreplyButton('reply');
		missingAttachLayer.wait();

		missingAttachLayer.close();
		messageToolbarSteps.clickFastreplyButton('cancel');
	});
});
