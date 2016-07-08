'use strict';

// messages
let Messages = require('../../steps/messages');
let messagesLettersSteps = require('../../steps/messages/letters');

// message
let messagefastreplySteps = require('../../steps/message/fastreply');
let messageToolbarSteps = require('../../steps/message/toolbar');

// compose
let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');

// layers
let missingAttachLayer = require('../../steps/layers/missingAttach');

let actions = require('../../utils/actions');

const text = 'Тестовый текст';
const subject = 'Тест';

describe('TESTMAIL-31874: Ответ на письмо. Забытое вложение. Проверить появление ' +
' попапа для быстрого ответа с текстом и без аттача', done => {
	before(Compose.auth);

	it('Попап появился', () => {
		let { fields } = new ComposeFieldsStore();

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
		messagefastreplySteps.clickButton('reply');

		composeEditor.wait();
		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);

		messageToolbarSteps.clickFastreplyButton('replyAll');
		missingAttachLayer.wait();

		missingAttachLayer.close();
		messageToolbarSteps.clickFastreplyButton('cancel');
	});
});
