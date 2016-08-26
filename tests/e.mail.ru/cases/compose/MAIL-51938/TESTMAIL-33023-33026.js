'use strict';

let deepmerge = require('deepmerge');

let SentPage = require('../../../steps/sent');
let Compose = require('../../../steps/compose');
let Messages = require('../../../steps/messages');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let Compose2EditorSteps = require('../../../steps/compose2/editor');
let ComposeFieldsSteps = require('../../../steps/compose/fields');
let ComposeControlsSteps = require('../../../steps/compose/controls');
let LettersSteps = require('../../../steps/messages/letters');
let LetterBodySteps = require('../../../steps/message/body');
let LetterHeadSteps = require('../../../steps/message/head');
let LetterAttachesSteps = require('../../../steps/message/attaches');
let FastreplySteps = require('../../../steps/message/fastreply');
let ComposeEditor = require('../../../steps/compose/editor');

let actions = require('../../../utils/actions');
let composeFieldsStore = require('../../../store/compose/fields');
let composeEditorStore = require('../../../store/compose/editor');

let createSignature = require('./meta/createSignature');

let letters = new LettersSteps();
let compose2Editor = new Compose2EditorSteps();
let messageToolbar = new MessageToolbarSteps();
let composeFields = new ComposeFieldsSteps();
let composeControls = new ComposeControlsSteps();
let letterBody = new LetterBodySteps();
let letterHead = new LetterHeadSteps();
let letterAttaches = new LetterAttachesSteps();
let fastreplySteps = new FastreplySteps();
let composeEditor = new ComposeEditor();

let {auth, resetSignatures, cleanInbox} = require('./meta');

let options = {
	signatureBeforeText: false,
	fastAnswer: false,
	signatures: [
		{image: true, isDefault: true},
		{image: false}
	],
	tests: [
		{
			testcase: 'TESTMAIL-33023',
			name: 'Полный ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка отправки и пришедшего письма с html подписью',
			open: () => {
				let { fields: composeStore } = composeFieldsStore;

				actions.sendMessage(
					composeStore.to,
					composeStore.from,
					composeStore.subject,
					composeEditorStore.texts.withAttach
				);

				Messages.open();
				letters.waitForNewestLetter();
				letters.openNewestLetter();

				if (options.fastAnswer) {
					fastreplySteps.clickButton('reply');
					composeEditor.wait();
				} else {
					messageToolbar.clickButton('reply');
					Compose.wait();
				}
			}
		},
		{
			testcase: 'TESTMAIL-33026',
			name: 'Полный ответ на письмо. HTML подпись. НЕ AJAX. ' +
			'Проверка отправки и пришедшего письма с html подписью',
			open: () => {
				Messages.open();
				letters.openNewestLetter();

				if (options.fastAnswer) {
					Compose.refresh();
					fastreplySteps.clickButton('reply');
					composeEditor.wait();
				} else {
					messageToolbar.clickButton('reply');
					Compose.refresh();
					Compose.wait();
				}
			}
		}
	]
};

options = deepmerge(options, module.parent.options || {});

describe(() => {
	before(() => {
		auth();
		resetSignatures();

		createSignature(options);
	});

	options.tests.forEach(({ testcase, name, open, skip }) => {

		if (skip) {
			return;
		}

		describe(testcase, () => {
			it(name, () => {
				open();

				compose2Editor.hasInline();

				let { fields: composeStore } = composeFieldsStore;

				composeFields.setFieldValue('to', composeStore.to);
				composeFields.setFieldValue('subject', composeStore.subject);
				compose2Editor.writeMessage(composeStore.text);

				if (options.fastAnswer) {
					messageToolbar.clickFastreplyButton('reply');
				} else {
					composeControls.send();
				}

				SentPage.wait();

				Messages.open();
				letters.waitForNewestLetter();
				letters.checkLetterBySubject(composeStore.subject);
				letters.isNewestLetterWithoutAttaches();

				letters.openNewestLetter();
				letterBody.hasInline();
				letterHead.noAttaches();
				letterAttaches.noAttaches();
			});
		});
	});

	after(() => {
		cleanInbox();
	});
});
