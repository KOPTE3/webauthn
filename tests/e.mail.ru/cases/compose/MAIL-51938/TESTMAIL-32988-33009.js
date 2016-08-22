'use strict';

let Compose = require('../../../steps/compose');
let Messages = require('../../../steps/messages');
let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let LettersSteps = require('../../../steps/messages/letters');
let SentPage = require('../../../steps/sent');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let Compose2EditorSteps = require('../../../steps/compose2/editor');
let ComposeFieldsSteps = require('../../../steps/compose/fields');
let ComposeControlsSteps = require('../../../steps/compose/controls');

let messagesToolbar = new MessagesToolbarSteps();
let messageToolbar = new MessageToolbarSteps();
let letters = new LettersSteps();
let compose2Editor = new Compose2EditorSteps();
let composeFields = new ComposeFieldsSteps();
let composeControls = new ComposeControlsSteps();

let { auth, resetSignatures, cleanInbox } = require('./meta');
let createSignature = require('./meta/createSignature');
let test = require('./meta/checkChangeSignature');

let composeFieldsStore = require('../../../store/compose/fields');

const tests = [
	{
		testcase: 'TESTMAIL-32988',
		name: 'Написание письма. HTML подпись. AJAX. Проверка смены подписи ' +
		'(две подписи, по умолчанию - отредактирована через панель ' +
		'редактирования с картинкой, вторая - обычный текст)',
		open: () => {
			Messages.open();
			messagesToolbar.clickButton('compose');
			Compose.wait();
		},
		close: () => {
			composeControls.cancel();
		}
	},

	{
		testcase: 'TESTMAIL-32995',
		name: 'Полный ответ на письмо. HTML подпись. AJAX. Проверка смены подписи ' +
		'(две подписи, по умолчанию - отредактирована через панель редактирования ' +
		'с картинкой, вторая - обычный текст) и что она не меняется в цитировании',
		open: () => {
			let { fields } = composeFieldsStore;

			Messages.open();
			messagesToolbar.clickButton('compose');
			Compose.wait();

			compose2Editor.hasInline();

			composeFields.setFieldValue('to', fields.to);
			composeFields.setFieldValue('subject', fields.subject);
			compose2Editor.writeMessage(fields.text);
			composeControls.send();
			SentPage.wait();

			Messages.open();
			letters.waitForNewestLetter();
			letters.openNewestLetter();

			messageToolbar.clickButton('reply');
			Compose.wait();
		},
		close: () => {
			composeControls.cancel();
			cleanInbox();
		},
		quoteInline: true
	}
];

describe(() => {
	before(() => {
		auth();
		resetSignatures();

		// TODO параметры
		createSignature();
	});

	tests.forEach((options) => {
		let { testcase, name } = options;

		describe(testcase, () => {
			it(name, () => {
				test(options);
			});
		});
	});
});
