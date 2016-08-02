'use strict';

let Messages = require('../../../steps/messages');
let MessagesLettersSteps = require('../../../steps/messages/letters');
let messagesLettersSteps = new MessagesLettersSteps();

let Message = require('../../../steps/message');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();

let MessagesFastReplySteps = require('../../../steps/message/fastreply');
let messagesFastReplySteps = new MessagesFastReplySteps();


let Compose = require('../../../steps/compose');
let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeFields = require('../../../steps/compose/fields');
let composeFields = new ComposeFields();
let ComposeAttaches = require('../../../steps/compose/attaches');
let composeAttaches = new ComposeAttaches();

let ComposeControls = require('../../../steps/compose/controls');

let SentPage = require('../../../steps/sent');

let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');

let Mail = require('../../../utils/mail');

const subject = 'TESTMAIL-31950';
const features = [
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark'
];

describe('TESTMAIL-31950: НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для быстрой пересылки с текстом в цитате, ' +
	'с аттачем (исходное письмо с аттачем)', () => {
	before(() => {
		Compose.auth();
	});

	it('Письмо должно быть отправлено', () => {
		let { fields } = composeFieldsStore;
		let { texts } = composeEditorStore;
		let mail = new Mail({
			to: fields.to,
			subject,
			text: texts.withAttach
		});

		mail.addAttach('file1.txt');
		mail.send();

		Compose.features(features);

		Messages.open();
		messagesLettersSteps.openNewestLetter();

		Message.features(features);
		Message.refresh();

		messagesFastReplySteps.clickButton('forward');
		composeEditor.wait();

		composeFields.setFieldValue('to', fields.to);
		composeAttaches.hasAttach('file1.txt');

		composeEditor.hasForwardedMessage(texts.withAttach);
		messageToolbarSteps.clickFastreplyButton('resend');

		SentPage.wait();
	});
});
