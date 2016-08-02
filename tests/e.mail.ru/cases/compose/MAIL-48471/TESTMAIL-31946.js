/* global describe, it*/
'use strict';

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

let ComposeAttaches = require('../../../steps/compose/attaches');
let composeAttaches = new ComposeAttaches();


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

describe('НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
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

			const { fields } = composeFieldsStore;

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
			messageFastReplySteps.clickButton('reply');

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
				composeEditor.alertAccept();
				throw new Error(error);
			}

			// должны перейти на старницу /sendmsgok
			SentPage.wait();
		});
	}
);
