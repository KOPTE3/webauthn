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
let composeControls = require('../../steps/compose/controls');

// layers
let missingAttachLayer = require('../../steps/layers/missingAttach');

// utils
let actions = require('../../utils/actions');

const subject = 'TESTMAIL-32353';
const text = 'Тестовый текст';

describe('TESTMAIL-32353 ' +
	'Из НЕ AJAX чтения. Ответ на письмо. Забытое вложение. Проверить ' +
	'появление попапа для полного ответа с текстом и без аттача',
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

			const { fields } = new ComposeFieldsStore();

			Messages.open();

			actions.sendMessage(
				fields.to,
				fields.from,
				subject,
				text
			);

			Messages.features(features);
			Messages.open();
			messagesLettersSteps.openNewestLetter();

			Message.features(features);
			Message.refresh();
			Message.wait();

			messageToolbarSteps.clickButton('reply');
			composeEditor.wait();

			composeEditor.writeMessage(composeEditorStore.texts.withAttach);

			composeControls.send();

			missingAttachLayer.wait();
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
