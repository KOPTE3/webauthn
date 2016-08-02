/* global describe, it*/
'use strict';

// Messages
let Messages = require('../../../steps/messages');
let MessagesLettersSteps = require('../../../steps/messages/letters');
let messagesLettersSteps = new MessagesLettersSteps();

// Message
let Message = require('../../../steps/message');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();

// Compose
let composeFieldsStore = require('../../../store/compose/fields');
let СomposeEditor = require('../../../steps/compose/editor');
let composeEditor = new СomposeEditor();
let ComposeControls = require('../../../steps/compose/controls');
let composeControls = new ComposeControls();

// layers
let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let missingAttachLayer = new MissingAttachLayer();

// utils
let actions = require('../../../utils/actions');


const subject = 'Teст';
const testText = 'Тестовый текст';

/**
 * Текст с упоминанием прикрепленного аттача
 */
const withAttach = 'Добрый день!\nВо вложении заявка, ' +
' прошу скинуть счет на оплату.';

describe('НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить появление попапа для полного ответа с текстом и без аттача', () => {
	before(() => {
		Messages.auth();
	});

	it('Должен появится попап с текстом', () => {
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
			testText
		);

		Messages.features(features);
		Messages.open();

		messagesLettersSteps.openNewestLetter();
		messageToolbarSteps.clickButton('reply');

		Messages.features(features);
		Messages.refresh();

		composeEditor.wait();
		composeEditor.writeMessage(withAttach);
		composeEditor.wait();
		composeControls.send();

		missingAttachLayer.wait();
		try {
			missingAttachLayer.checkTexts();
		} catch (error) {
			throw new Error(error);
		} finally {
			try {
				missingAttachLayer.close();
				missingAttachLayer.shouldBeClosed();
			} catch (error) {
				throw new Error(error);
			} finally {
				composeEditor.wait();
				composeControls.cancel();
			}
		}
	});
});
