/* global describe, it*/
'use strict';

let assert = require('assert');

// Messages
let Messages = require('../../../steps/messages');
let MessagesLettersSteps = require('../../../steps/messages/letters');
let messagesLettersSteps = new MessagesLettersSteps();

// Message
let Message = require('../../../steps/message');
let MessageFastReplySteps = require('../../../steps/message/fastreply');
let messageFastReplySteps = new MessageFastReplySteps();
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();

// Compose
let composeFieldsStore = require('../../../store/compose/fields');
let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeFields = require('../../../steps/compose/fields');
let composeFields = new ComposeFields();


let SentPage = require('../../../steps/sent');

// layers
let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let missingAttachLayer = new MissingAttachLayer();

// utils
let actions = require('../../../utils/actions');
let Mail = require('../../../utils/mail');

const subject = 'Tect';
const testText = 'Тестовый текст';

const endUrl = '/sendmsgok';

/**
 * Текст с упоминанием прикрепленного аттача
 */
const withAttach = 'Добрый день!\nВо вложении заявка, ' +
'прошу скинуть счет на оплату.';

describe('TESTMAIL-31936 AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для быстрой пересылки с текстом в цитате, ' +
	'с аттачем (исходное письмо с аттачем)', () => {
	before(() => {
		Messages.auth();
	});

	it('Не должно появиться попапа с текстом', () => {
		const features = [
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		];

		const { fields } = composeFieldsStore;

		Messages.open();

		let mail = new Mail({
			to: fields.to,
			subject,
			text: withAttach
		});

		mail.addAttach('file1.txt');
		mail.send();

		Messages.features(features);
		Messages.open();

		messagesLettersSteps.openNewestLetter();

		messageFastReplySteps.clickButton('forward');

		composeEditor.wait();

		composeFields.setFieldValue('to', fields.to);

		composeEditor.writeMessage(testText);

		// если будет ошибка то нам надо обязательно уйти со страницы написания письма
		// так как браузер при закрытии выдаст алерт
		try {
			composeEditor.hasForwardedMessage(withAttach);
		} catch (error) {
			messageToolbarSteps.clickFastreplyButton('cancel');
			// так как мы поменяли текст, выскочит алерт после закрытия,
			// нужно его принять
			composeEditor.alertAccept();
			throw new Error(error);
		}

		messageToolbarSteps.clickFastreplyButton('resend');
		try {
			missingAttachLayer.wait(true);
		} catch (error) {
			missingAttachLayer.close();
			messageToolbarSteps.clickFastreplyButton('cancel');
			// так как мы поменяли текст, выскочит алерт после закрытия,
			// нужно его принять
			composeEditor.alertAccept();
			throw new Error(error);
		}
	});
});
