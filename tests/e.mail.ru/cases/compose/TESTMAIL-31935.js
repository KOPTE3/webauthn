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
let СomposeFieldsStore = require('../../store/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeFields = require('../../steps/compose/fields');


let composeAttaches = require('../../steps/compose/attaches');


let SentPage = require('../../steps/sent');

// layers
let missingAttachLayer = require('../../steps/layers/missingAttach');

// utils
let actions = require('../../utils/actions');
let Mail = require('../../utils/mail');

const subject = 'Tect';
const testText = 'Тестовый текст';

const endUrl = '/sendmsgok';

/**
 * Текст с упоминанием прикрепленного аттача
 */
const withAttach = 'Добрый день!\nВо вложении заявка, ' +
'прошу скинуть счет на оплату.';

describe('TESTMAIL-31935 AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для быстрой пересылки с текстом в цитате, ' +
	'с аттачем (добавление аттача на пересылке)',
	() => {
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

			const { fields } = new СomposeFieldsStore();

			Messages.open();

			let mail = new Mail({
				to: fields.to,
				subject,
				text: withAttach
			});

			mail.send();

			Messages.features(features);
			Messages.open();

			messagesLettersSteps.openNewestLetter();
	
			messagefastreplySteps.clickButton('reply');

			composeEditor.wait();

			composeEditor.writeMessage(testText);

			composeAttaches.uploadAttach('1exp.JPG');

			// если будет ошибка то нам надо обязательно уйти со страницы написания письма
			// так как браузер при закрытии выдаст алерт
			try {
				composeEditor.hasReplyMessage(withAttach);
			} catch (error) {
				messageToolbarSteps.clickFastreplyButton('cancel');
				// так как мы поменяли текст, выскочит алерт после закрытия,
				// нужно его принять
				composeEditor.allertAccept();
				throw error;
			}

			messageToolbarSteps.clickFastreplyButton('reply');
			try {
				missingAttachLayer.wait(true);
			} catch (error) {
				missingAttachLayer.close();
				messageToolbarSteps.clickFastreplyButton('cancel');
				// так как мы поменяли текст, выскочит алерт после закрытия,
				// нужно его принять
				composeEditor.allertAccept();
				throw error;
			}
		});
	}
);
