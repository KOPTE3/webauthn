'use strict';

let Messages = require('../../../steps/messages');
let Message = require('../../../steps/message');

let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();

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

let ComposeAttaches = require('../../../steps/compose/attaches');
let composeAttaches = new ComposeAttaches();

// mail
let Mail = require('../../../utils/mail');

const subject = 'TESTMAIL-32346';

const features = [
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark'
];

describe('Из НЕ AJAX чтения. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для пересылки с текстом в цитате, ' +
	'с аттачем (добавление аттача на пересылке)', () => {
	before(() => {
		Compose.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = composeFieldsStore;

		var mail = new Mail({
			to: fields.to,
			subject,
			text: composeEditorStore.texts.withAttach
		});

		mail.send();

		Messages.open();
		lettersSteps.openNewestLetter();
		Message.wait();

		Message.features(features);
		Message.refresh();
		Message.wait();

		messageToolbarSteps.clickButton('forward');
		Compose.wait();

		composeFields.setFieldValue('to', fields.to);
		composeAttaches.uploadAttach('file1.txt');

		composeControls.send();

		SentPage.wait();
	});
});
