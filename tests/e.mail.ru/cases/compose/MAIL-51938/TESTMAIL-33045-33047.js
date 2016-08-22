'use strict';

let Compose = require('../../../steps/compose');
let Messages = require('../../../steps/messages');
let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let Compose2EditorSteps = require('../../../steps/compose2/editor');
let ComposeFieldsSteps = require('../../../steps/compose/fields');
let ComposeControlsSteps = require('../../../steps/compose/controls');
let LettersSteps = require('../../../steps/messages/letters');

let actions = require('../../../utils/actions');
let composeFieldsStore = require('../../../store/compose/fields');

let createSignature = require('./meta/createSignature');

let messagesToolbar = new MessagesToolbarSteps();
let letters = new LettersSteps();
let compose2Editor = new Compose2EditorSteps();
let composeFields = new ComposeFieldsSteps();
let composeControls = new ComposeControlsSteps();

let {auth, resetSignatures, cleanInbox} = require('./meta');

let createAndOpenDraft = function (noajax) {
	let { fields } = composeFieldsStore;

	Messages.open();
	messagesToolbar.clickButton('compose');
	Compose.wait();

	compose2Editor.hasInline();

	composeFields.setFieldValue('to', fields.to);
	composeFields.setFieldValue('subject', fields.subject);
	compose2Editor.writeMessage(fields.text);

	composeControls.draft();

	Messages.open('/messages/drafts/');
	letters.openFirstCompose();

	if (noajax) {
		Compose.refresh();
	}

	Compose.wait();
};

let options = {
	signatures: [
		{image: true, isDefault: true},
		{image: false}
	],
	tests: [
		{
			testcase: 'TESTMAIL-33045',
			name: 'Черновики. HTML подпись. AJAX. ' +
			'Проверка отображения HTML подписи в черновиках',
			open: () => {
				createAndOpenDraft(false);
			}
		},
		{
			testcase: 'TESTMAIL-33047',
			name: 'Черновики. HTML подпись. НЕ AJAX. ' +
			'Проверка отображения HTML подписи в черновиках',
			open: () => {
				createAndOpenDraft(true);
			}
		}
	]
};

describe(() => {
	before(() => {
		auth();
		resetSignatures();

		createSignature(options);
	});

	options.tests.forEach(({ testcase, name, open }) => {
		describe(testcase, () => {
			it(name, () => {
				open();

				compose2Editor.hasInline();
			});
		});
	});

	after(() => {
		cleanInbox();
	});
});
