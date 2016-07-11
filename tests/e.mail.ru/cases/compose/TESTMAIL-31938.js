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

		// костыль! поле должно было заполниться автоматом,
		// а не заполнилось само
		// видимо после перезагрузки страницы слишком быстро нажали на ответить
		// и что то там не догрузилось
		composeFields.setFieldValue('to', fields.to);

		composeEditor.writeMessage(withAttach);

		messageToolbarSteps.clickFastreplyButton('resend');

		missingAttachLayer.wait();

		try {
			missingAttachLayer.checkHeadText();
			missingAttachLayer.checkDescText();
			missingAttachLayer.checkButtons();
		} catch (err) {
			throw err;
		} finally {
			missingAttachLayer.close();
			messageToolbarSteps.clickFastreplyButton('cancel');
			// так как мы поменяли текст, выскочит алерт, нужно его принять
			composeEditor.allertAccept();
		}
	});
});
