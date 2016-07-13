'use strict';

let Messages = require('../../steps/messages');
let Message = require('../../steps/message');
let lettersSteps = require('../../steps/messages/letters');
let fastreplySteps = require('../../steps/message/fastreply');
let SettingsMessages = require('../../steps/settings/messages');
let settingsMessagesForm = require('../../steps/settings/messages/form');

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

const subject = 'TESTMAIL-32289';

describe('TESTMAIL-32289: ' +
	'НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для полного ответа с текстом в цитате ' +
	'(текст для которого попап появляться не должен)',
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

			SettingsMessages.open();

			settingsMessagesForm.toggleField('sendReplyIncludeMessage');
			settingsMessagesForm.save();

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

			messageToolbarSteps.clickButton('reply');

			Compose.wait();

			// Вписываем текст с сообщением
			composeEditor.writeMessage(composeEditorStore.texts.withoutAttach);
			composeControls.send();

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
