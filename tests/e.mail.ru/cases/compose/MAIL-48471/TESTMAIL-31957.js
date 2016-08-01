'use strict';

let Messages = require('../../../steps/messages');
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

// mail
let Mail = require('../../../utils/mail');

const subject = 'Тестовый текст';

describe('TESTMAIL-31957: НЕ AJAX. Черновики. Забытое вложение. Проверить ' +
'отсутствие попапа при отправке с текстом и аттачем из черновика ' +
'(исходный черновик с аттачем)', () => {
	before(() => {
		Compose.auth();
	});

	it('Письмо должно быть успешно отправлено', () => {
		let { fields } = composeFieldsStore;

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
		lettersSteps.openFirstCompose();

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
