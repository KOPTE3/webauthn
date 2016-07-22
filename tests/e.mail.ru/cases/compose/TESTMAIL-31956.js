'use strict';

let Messages = require('../../steps/messages');
let LettersSteps = require('../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let Compose = require('../../steps/compose');
let ComposeEditor = require('../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeControls = require('../../steps/compose/controls');
let composeControls = new ComposeControls();
let composeEditorStore = require('../../store/compose/editor');
let composeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let SentPage = require('../../steps/sent');
let ComposeAttaches = require('../../steps/compose/attaches');
let composeAttaches = new ComposeAttaches();

// mail
let Mail = require('../../utils/mail');

const subject = 'тестовая тема';

describe('TESTMAIL-31956: НЕ AJAX. Черновики. Забытое вложение. ' +
	'Проверить отсутствие попапа при отправке с текстом и аттачем из черновика ' +
	'(добавление аттача после сохранения черновика)', done => {
	before(() => {
		Compose.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = composeFieldsStore;

		var mail = new Mail({
			to: fields.to,
			subject,
			text: composeEditorStore.texts.withoutAttach
		});

		mail.draft();

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

		composeAttaches.uploadAttach('1exp.JPG');

		composeControls.send();

		SentPage.wait();
	});
});
