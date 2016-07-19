'use strict';

let Messages = require('../../steps/messages');
let Message = require('../../steps/message');
let lettersSteps = require('../../steps/messages/letters');
let fastreplySteps = require('../../steps/message/fastreply');

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let messageToolbarSteps = require('../../steps/message/toolbar');
let SentPage = require('../../steps/sent');
let composeAttaches = require('../../steps/compose/attaches');

// mail
let Mail = require('../../utils/mail');

const subject = 'TESTMAIL-32288';

describe('TESTMAIL-32288: ' +
	'НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для полного ответа с текстом в теле ' +
	'(текст для которого не должен появляться попап)',
	done => {
		before(() => {
			// Авторизуемся
			Compose.auth();
		});

		it('Попап не должен появиться', () => {
			let {fields} = new ComposeFieldsStore();
			const features = [
				'check-missing-attach',
				'disable-ballons',
				'no-collectors-in-compose',
				'disable-fastreply-landmark'
			];

			// Присылаем письмо себе
			var mail = new Mail({
				to: fields.to,
				subject,
				text: composeEditorStore.texts.withoutAttach
			});

			mail.send();

			// Заходим на чтение письма
			Messages.features(features);
			Messages.open();
			lettersSteps.openNewestLetter();

			Message.features(features);
			Message.refresh();
			Message.wait();

			fastreplySteps.clickButton('reply');

			composeEditor.wait();

			// Вписываем текст с сообщением
			composeEditor.writeMessage(composeEditorStore.texts.withoutAttach);
			messageToolbarSteps.clickFastreplyButton('reply');

			try {
				// попап не должен появится
				missingAttachLayer.wait(true);
			} catch (error) {
				missingAttachLayer.close();
				composeControls.cancel();
				throw error;
			}

			// должно в конце перейти на страницу успешной отправки
			SentPage.wait();
		});
	}
);
