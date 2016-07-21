'use strict';

let Messages = require('../../../steps/messages');
let Message = require('../../../steps/message');
let Compose = require('../../../steps/compose');
let SentPage = require('../../../steps/sent');

let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();

let ComposeControls = require('../../../steps/compose/controls');
let composeControls = new ComposeControls();

let composeFields = require('../../../steps/compose/fields');

let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();

let missingAttachLayer = require('../../../steps/layers/missingAttach');
let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');

let Mail = require('../../../utils/mail');

describe('TESTMAIL-32540: Новое написание письма. Черновики. Проверка, ' +
	'что отправляется письмо из черновиков после обновления страницы.', () => {
	before(() => {
		Compose.auth();
	});

	it('Письмо должно отправиться', () => {
		const { fields } = composeFieldsStore;
		const subject = 'TESTMAIL-32540';
		const mail = new Mail({
			to: fields.to,
			subject,
			text: composeEditorStore.texts.withoutAttach
		});

		mail.send();

		Messages.features([
			'reattach-to-reply',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Messages.open();
		lettersSteps.openNewestLetter();

		messageToolbarSteps.clickButton('reply');

		composeEditor.wait();

		composeControls.draft();

		Messages.open('/messages/drafts/');
		lettersSteps.openFirstCompose();
		composeEditor.wait();

		Compose.features([
			'reattach-to-reply',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);
		Compose.refresh();

		composeEditor.wait();

		composeControls.send();

		SentPage.wait();
		SentPage.isVisible();
	});
});
