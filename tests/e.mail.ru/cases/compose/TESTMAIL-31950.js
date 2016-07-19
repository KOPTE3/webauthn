'use strict';

let Messages = require('../../steps/messages');
let messagesLettersSteps = require('../../steps/messages/letters');

let Message = require('../../steps/message');
let messagesFastReplySteps = require('../../steps/message/fastreply');
let messageToolbarSteps = require('../../steps/message/toolbar');

let Compose = require('../../steps/compose');
let composeEditor = require('../../steps/compose/editor');
let composeFields = require('../../steps/compose/fields');
let composeControls = require('../../steps/compose/controls');
let composeAttaches = require('../../steps/compose/attaches');

let SentPage = require('../../steps/sent');

let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');

let Mail = require('../../utils/mail');

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
		let { fields } = new ComposeFieldsStore();
		let { texts } = ComposeEditorStore;
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

		messageToolbarSteps.clickButton('forward');
		composeEditor.wait();

		composeFields.setFieldValue('to', fields.to);
		composeAttaches.hasAttach('file1.txt');

		composeEditor.hasForwardedMessage(texts.withAttach);
		messageToolbarSteps.clickFastreplyButton('resend');

		SentPage.wait();
	});
});
