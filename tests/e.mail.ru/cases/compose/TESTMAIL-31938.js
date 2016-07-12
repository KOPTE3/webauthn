/* global describe, it*/
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
let composeEditor = require('../../steps/compose/editor');
let composeFields = require('../../steps/compose/fields');

// layers
let missingAttachLayer = require('../../steps/layers/missingAttach');

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

		const { fields } = new ComposeFieldsStore();

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
		} catch (err) {
			throw err;
		} finally {
			try {
				missingAttachLayer.close();
				missingAttachLayer.shouldBeClosed();
			} catch (err2) {
				throw err2;
			} finally {
				messageToolbarSteps.clickFastreplyButton('cancel');
				// так как мы поменяли текст, выскочит алерт после закрытия, нужно его принять
				composeEditor.allertAccept();
			}
		}
	});
});
