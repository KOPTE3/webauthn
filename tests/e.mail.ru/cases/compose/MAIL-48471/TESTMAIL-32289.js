'use strict';

let Messages = require('../../../steps/messages');
let Message = require('../../../steps/message');
let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();
let SettingsMessages = require('../../../steps/settings/messages');
let SettingsMessagesForm = require('../../../steps/settings/messages/form');
let settingsMessagesForm = new SettingsMessagesForm();

let Compose = require('../../../steps/compose');
let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeControls = require('../../../steps/compose/controls');
let composeControls = new ComposeControls();
let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let missingAttachLayer = new MissingAttachLayer();
let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');
let actions = require('../../../utils/actions');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();
let SentPage = require('../../../steps/sent');

// mail
let Mail = require('../../../utils/mail');

const subject = 'TESTMAIL-32289';

describe('НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для полного ответа с текстом в цитате ' +
	'(текст для которого попап появляться не должен)', () => {

	before(() => {
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
		Message.wait();

		messageToolbarSteps.clickButton('reply');

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
			throw new Error(error);
		}

		// должно в конце перейти на страницу успешной отправки
		SentPage.wait();
	});
});
