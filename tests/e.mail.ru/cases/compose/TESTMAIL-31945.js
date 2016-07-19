'use strict';

let Messages = require('../../steps/messages');
let lettersSteps = require('../../steps/messages/letters');
let fastanswerSteps = require('../../steps/message/fastreply');

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

const subject = 'TESTMAIL-31945';

describe('TESTMAIL-31945: ' +
	'НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для полного ответа с текстом в теле письма, ' +
	'с аттачем', done => {
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

		// Заходим на чтение письма и нажимаем ответить в тулбаре
		Compose.features(features);
		Messages.open();
		lettersSteps.openNewestLetter();
		messageToolbarSteps.clickButton('reply');
		Compose.wait();

		// Обновляем страницу
		Compose.features(features);
		Compose.refresh();
		Compose.wait();

		// Вписываем текст с сообщением об атаче
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);
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
});
