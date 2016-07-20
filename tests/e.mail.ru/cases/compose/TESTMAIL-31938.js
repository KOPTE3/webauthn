/* global describe, it*/
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
let ComposeEditor = require('../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeFields = require('../../steps/compose/fields');
let composeFields = new ComposeFields();

// layers
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let missingAttachLayer = new MissingAttachLayer();

// utils
let actions = require('../../utils/actions');


const subject = 'Tect';
const testText = 'Тестовый текст';

/**
 * Текст с упоминанием прикрепленного аттача
 */
const withAttach = 'Добрый день!\nВо вложении заявка, ' +
' прошу скинуть счет на оплату.';

describe('TESTMAIL-31938 НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить появление попапа для быстрого ответа с текстом и без аттача', () => {
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

		Message.features(features);

		Message.refresh();

		Message.wait();


		messagefastreplySteps.clickButton('reply');

		composeEditor.wait();

		composeEditor.writeMessage(withAttach);

		messageToolbarSteps.clickFastreplyButton('reply');

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
				messageToolbarSteps.clickFastreplyButton('cancel');
				// так как мы поменяли текст, выскочит алерт после закрытия, нужно его принять
				composeEditor.allertAccept();
			}
		}
	});
});
