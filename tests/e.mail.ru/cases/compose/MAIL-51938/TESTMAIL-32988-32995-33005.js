'use strict';

let deepmerge = require('deepmerge');

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

let messagesUtils = require('../../../utils/messages');

let { auth, resetSignatures, cleanInbox } = require('./meta');
let createSignature = require('./meta/createSignature');
let checkChangeSignature = require('./meta/checkChangeSignature');

let composeFieldsStore = require('../../../store/compose/fields');

let openReply = function (noajax = false) {
	let { fields } = composeFieldsStore;

	Messages.open();
	messagesToolbar.clickButton('compose');
	Compose.wait();

	composeFields.setFieldValue('to', fields.to);
	composeFields.setFieldValue('subject', fields.subject);
	compose2Editor.writeMessage(fields.text);
	composeControls.send();
	SentPage.wait();

	Messages.open();
	letters.waitForNewestLetter();

	if (noajax) {
		let messageId = messagesUtils.getLetterIdBySubject(fields.subject);

		Compose.open(`/compose/${messageId}/reply`);
	} else {
		letters.openNewestLetter();
		messageToolbar.clickButton('reply');
		Compose.wait();
	}
};

let options = {
	signatureBeforeText: false,
	signatures: [
		{image: true, isDefault: true},
		{image: false}
	],
	tests: [
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
				openReply();
			},
			close: () => {
				cleanInbox();
				composeControls.cancel();
			},
			quoteInline: true
		},

		{
			testcase: 'TESTMAIL-33005',
			name: 'Полный ответ на письмо. HTML подпись. НЕ AJAX. Проверка смены подписи ' +
			'(две подписи, по умолчанию - отредактирована через панель редактирования ' +
			'с картинкой, вторая - обычный текст) и что она не меняется в цитировании',
			open: () => {
				openReply(true);
			},
			close: () => {
				cleanInbox();
				composeControls.cancel();
			},
			quoteInline: true
		}
	]
};

if (module.parent && module.parent.options) {
	options = deepmerge(options, module.parent.options);
}

if (options.overrideTests) {
	options.tests = options.tests.filter((test) => {
		let { testcase } = test;

		if (options.overrideTests[testcase]) {
			test.testcase = options.overrideTests[testcase].testcase;
			test.name = options.overrideTests[testcase].name;

			return true;
		} else {
			return false;
		}
	});
}

describe(() => {
	before(() => {
		auth();
		resetSignatures();

		createSignature(options);
	});

	options.tests.forEach((test) => {
		let { testcase, name } = test;

		describe(testcase, () => {
			it(name, () => {
				checkChangeSignature(test, options.signatures);
			});
		});
	});
});
