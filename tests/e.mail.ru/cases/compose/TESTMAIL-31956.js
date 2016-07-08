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
let composeAttaches = require('../../steps/compose/attaches');

// mail
let Mail = require('../../utils/mail');

const subject = 'Тестовый текст';

describe('TESTMAIL-31956: НЕ AJAX. Черновики. Забытое вложение. Проверить ' +
'отсутствие попапа при отправке с текстом и аттачем из черновика (добавление ' +
'аттача после сохранения черновика)', done => {
	before(() => {
		Compose.auth();
	});

	it('Письмо должно быть успешно отправленно', () => {
		let { fields } = new ComposeFieldsStore();

		var mail = new Mail({
			to: fields.to,
			subject,
			text: composeEditorStore.texts.withAttach
		});

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
			'disable-fastreply-landmark',
			'compose2',
			'compose2-visible-toolbar'
		]);

		Compose.refresh();
		composeEditor.wait();
		composeAttaches.uploadAttach('1exp.JPG');
		composeFields.setFieldValue('subject', subject);
		composeFields.setFieldValue('to', fields.to);
		composeControls.send();

		SentPage.wait();
	});
});
