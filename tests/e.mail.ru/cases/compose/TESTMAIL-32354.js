'use strict';

// Messages
let Messages = require('../../steps/messages');
let MessagesLettersSteps = require('../../steps/messages/letters');
let messagesLettersSteps = new MessagesLettersSteps();

// Message
let Message = require('../../steps/message');
let MessagefastreplySteps = require('../../steps/message/fastreply');
let messagefastreplySteps = new MessagefastreplySteps();
let MessageToolbarSteps = require('../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();

// Compose
let composeFieldsStore = require('../../store/compose/fields');
let composeEditorStore = require('../../store/compose/editor');
let ComposeEditor = require('../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeFields = require('../../steps/compose/fields');
let composeFields = new ComposeFields();
let ComposeControls = require('../../steps/compose/controls');
let composeControls = new ComposeControls();

// layers
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let missingAttachLayer = new MissingAttachLayer();

// utils
let actions = require('../../utils/actions');

const subject = 'TESTMAIL-32354';
const text = 'Тестовый текст';

describe('TESTMAIL-32354 ' +
	'Из НЕ AJAX чтения. Ответ на письмо. Забытое вложение. Проверить появление ' +
	'попапа для пересылки из тулбара с текстом и без аттача',
	done => {
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

			const { fields } = composeFieldsStore;

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
			Message.wait();

			messageToolbarSteps.clickButton('forward');
			composeEditor.wait();

			composeFields.setFieldValue('to', fields.to);
			composeEditor.writeMessage(text);

			composeControls.send();
			MissingAttachLayer.wait();
			try {
				missingAttachLayer.checkTexts();
			} catch (err) {
				throw err;
			} finally {
				try {
					missingAttachLayer.close();
					missingAttachLayer.shouldBeClosed();
				} catch (err2) {
					throw err2;
				} finally {
					composeEditor.wait();
					composeControls.cancel();
				}
			}
		});
	}
);
