'use strict';

let Messages = require('../../steps/messages');
let LettersSteps = require('../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let Compose = require('../../steps/compose');
let ComposeFields = require('../../steps/compose/fields');
let composeFields = new ComposeFields();
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
let ComposeAttaches = require('../../steps/compose/attaches');
let composeAttaches = new ComposeAttaches();

// mail
let Mail = require('../../utils/mail');

const subject = 'TESTMAIL-31947';

describe('TESTMAIL-31947: ' +
	'AJAX. Ответ на письмо. Забытое вложение. Проверить отсутствие попапа ' +
	'для пересылки с текстом в цитате, с аттачем (добавление аттача на пересылке)',
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
				text: composeEditorStore.texts.withAttach
			});

			mail.send();

			// Заходим на чтение письма
			Compose.features(features);
			Messages.open();
			lettersSteps.openNewestLetter();
			
			// нажимаем на переслать в общем тулбаре
			messageToolbarSteps.clickButton('forward');
			Compose.wait();

			Compose.features(features);
			Compose.refresh();
			Compose.wait();

			composeFields.setFieldValue('to', fields.to);
			// Вписываем текст с сообщением об атаче
			composeAttaches.uploadAttach('file1.txt');
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
