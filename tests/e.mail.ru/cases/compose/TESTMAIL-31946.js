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
let Compose = require('../../steps/compose');
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

describe('TESTMAIL-31946 ' +
	'НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для быстрого ответа с текстом в теле письма, ' +
	'с аттачем',
	() => {
		before(() => {
			// Авторизуемся
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

			// Пишем себе письмо
			let mail = new Mail({
				to: fields.to,
				subject,
				text: testText
			});

			mail.send();

			Messages.features(features);
			Messages.open();
			Messages.wait();

			// Заходим на чтение письма нашего
			messagesLettersSteps.openNewestLetter();

			// обновляем страницу, т.к. не ajax
			Message.features(features);
			Message.refresh();
			Message.wait();

			// Кликаем на быстрый ответ
			messagefastreplySteps.clickButton('reply');

			// Добавляем в тело письма текст с сообщением об аттаче
			composeEditor.wait();
			composeEditor.writeMessage(withAttach);
			// Любой аттач
			composeAttaches.uploadAttach('1exp.JPG');

			// Кликнуть отправить
			messageToolbarSteps.clickFastreplyButton('reply');
			try {
				// попап не должен появится
				missingAttachLayer.wait(true);
			} catch (error) {
				missingAttachLayer.close();
				messageToolbarSteps.clickFastreplyButton('cancel');
				// так как мы поменяли текст, выскочит алерт после закрытия,
				// нужно его принять
				composeEditor.allertAccept();
				throw error;
			}

			// должны перейти на старницу /sendmsgok
			SentPage.wait();
		});
	}
);
