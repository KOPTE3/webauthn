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

let SentPage = require('../../../steps/sent');

// mail
let Mail = require('../../../utils/mail');

const subject = 'TESTMAIL-32341';

const features = [
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark'
];

describe('TESTMAIL-32341: НЕ AJAX. Черновики. Забытое вложение. Проверить отсутствие попапа при ' +
	' отправке из черновика (текст для которого попап появляться не должен) ' +
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

		Compose.features(features);
		Compose.refresh();
		Compose.wait();

		composeEditor.wait();

		composeFields.setFieldValue('to', fields.to);
		composeControls.send();

		SentPage.wait();
	});
});
