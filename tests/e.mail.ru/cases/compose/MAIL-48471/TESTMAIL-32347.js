'use strict';

let Messages = require('../../../steps/messages');
let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();
let Message = require('../../../steps/message');

let Compose = require('../../../steps/compose');
let ComposeFields = require('../../../steps/compose/fields');
let composeFields = new ComposeFields();
let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeControls = require('../../../steps/compose/controls');
let composeControls = new ComposeControls();
let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');
let actions = require('../../../utils/actions');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();
let SentPage = require('../../../steps/sent');

// mail
let Mail = require('../../../utils/mail');

const subject = 'TESTMAIL-32347';

const features = [
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark'
];

describe('TESTMAIL-32347: Из НЕ AJAX чтения. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для полного ответа с текстом в теле ' +
	'(текст для которого не должен появляться попап)', done => {
	before(() => {
		Compose.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = composeFieldsStore;

		var mail = new Mail({
			to: fields.to,
			subject,
			text: 'Тестовый текст'
		});

		mail.send();

		Messages.open();

		lettersSteps.openNewestLetter();
		Message.wait();

		Message.features(features);
		Message.refresh();
		Message.wait();

		messageToolbarSteps.clickButton('reply');
		composeEditor.wait();

		composeEditor.writeMessage(composeEditorStore.texts.withoutAttach);

		composeControls.send();

		SentPage.wait();
	});
});
