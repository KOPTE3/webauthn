'use strict';

let Messages = require('../../steps/messages');
let LettersSteps = require('../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let Compose = require('../../steps/compose');
let ComposeEditor = require('../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeControls = require('../../steps/compose/controls');
let composeControls = new ComposeControls();
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let missingAttachLayer = new MissingAttachLayer();
let composeEditorStore = require('../../store/compose/editor');
let composeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let MessageToolbarSteps = require('../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();
let SentPage = require('../../steps/sent');

// mail
let Mail = require('../../utils/mail');

const subject = 'TESTMAIL-32287';

describe('TESTMAIL-32287: ' +
	'НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для полного ответа с текстом в теле ' +
	'(текст для которого не должен появляться попап)',
	done => {
		before(() => {
			// Авторизуемся
			Compose.auth();
		});

		it('Попап не должен появиться', () => {
			let {fields} = composeFieldsStore;
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
			Compose.features(features);
			Messages.open();
			lettersSteps.openNewestLetter();

			// нажимаем на ответить в общем тулбаре
			messageToolbarSteps.clickButton('reply');
			Compose.wait();

			Compose.features(features);
			Compose.refresh();
			Compose.wait();

			composeEditor.wait();

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
