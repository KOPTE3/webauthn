'use strict';

let Messages = require('../../steps/messages');
let lettersSteps = require('../../steps/messages/letters');
let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let messageToolbarSteps = require('../../steps/message/toolbar');
let SentPage = require('../../steps/sent');

// mail
let Mail = require('../../utils/mail');

const subject = 'Тестовый текст';

describe('TESTMAIL-31957: НЕ AJAX. Черновики. Забытое вложение. Проверить ' +
'отсутствие попапа при отправке с текстом и аттачем из черновика ' +
'(исходный черновик с аттачем)', () => {
	before(() => {
		Compose.auth();
	});

	it('Письмо должно быть успешно отправлено', () => {
		let { fields } = new ComposeFieldsStore();

		var mail = new Mail({
			to: fields.to,
			subject,
			text: composeEditorStore.texts.withAttach
		});

		mail.addAttach('inline');
		mail.send();

		Messages.open();
		lettersSteps.openNewestLetter();
		messageToolbarSteps.clickButton('forward');

		composeEditor.wait();
		composeControls.draft();

		Messages.open('/messages/drafts/');
		lettersSteps.openNewestLetter();

		composeEditor.wait();

		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Compose.refresh();
		composeEditor.wait();
		composeFields.setFieldValue('subject', subject);
		composeFields.setFieldValue('to', fields.to);
		composeControls.send();

		SentPage.wait();
	});
});
