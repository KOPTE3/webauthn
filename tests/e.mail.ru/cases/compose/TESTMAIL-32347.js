'use strict';

let Messages = require('../../steps/messages');
let lettersSteps = require('../../steps/messages/letters');
let Message = require('../../steps/message');

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
		let {fields} = new ComposeFieldsStore();

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

		messageToolbarSteps.clickButton('replyAll');
		composeEditor.wait();

		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(composeEditorStore.texts.withoutAttach);

		composeControls.send();

		SentPage.wait();
	});
});
