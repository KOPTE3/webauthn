'use strict';

let Messages = require('../../steps/messages');
let messagesLettersSteps = require('../../steps/messages/letters');

let Message = require('../../steps/message');
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

const subject = 'TESTMAIL-31876';
const attach = 'file1.txt';

const features = [
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark'
];

describe('TESTMAIL-31876: НЕ AJAX. Ответ на письмо. Забытое вложение.' +
	' Проверить отсутствие попапа для полного ответа с текстом в цитате',() => {
	before(() => {
		Compose.auth();
	});

	it('Письмо должно быть отправлено', () => {
		let { fields } = new ComposeFieldsStore();

		// TODO: Проверить все остальные текста из теста юнит-тестами
		Compose.sendMail({
			text: composeEditorStore.classifierTest.lettersWithAttach[0],
			to: fields.to,
			subject,
			attach
		});

		Compose.features(features);
		Messages.open();
		messagesLettersSteps.openBySubject(subject);
		Message.features(features);

		messageToolbarSteps.clickButton('forward');

		composeEditor.wait();
		composeFields.setFieldValue('to', fields.to);
		composeControls.send();

		SentPage.wait();
	});
});
