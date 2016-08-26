'use strict';

let deepmerge = require('deepmerge');

let MessagesSteps = require('../../../steps/messages');
let MessagesLettersSteps = require('../../../steps/messages/letters');
let messagesLettersSteps = new MessagesLettersSteps();
let MessageFastReplySteps = require('../../../steps/message/fastreply');
let messageFastReplySteps = new MessageFastReplySteps();
let ComposeEditorSteps = require('../../../steps/compose/editor');
let composeEditorSteps = new ComposeEditorSteps();

let authorizationStore = require('../../../store/authorization');
let Mail = require('../../../utils/mail');

let {auth, resetSignatures, cleanInbox} = require('./meta');
let createSignature = require('./meta/createSignature');
let checkChangeSignature = require('./meta/checkChangeSignature');

let options = {
	signatureBeforeText: false,

	signatures: [
		{image: true, isDefault: true},
		{image: false}
	],

	tests: [
		{
			testcase: 'TESTMAIL-33029',

			name: 'Быстрый ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка смены подписи ' +
			'(две подписи, по умолчанию - отредактирована через панель ' +
			'редактирования с картинкой, вторая - обычный текст) ' +
			'и что она не меняется в цитировании',

			open: () => {
				MessagesSteps.open();

				let email = authorizationStore.account.get('email');
				let subject = 'fastReplyTest';

				let mail = new Mail({
					from: email,
					to: email,
					subject,
					text: 'text'
				});

				mail.send();

				let stop = false;

				while (!stop) {
					try {
						messagesLettersSteps.checkLetterBySubject(subject);
						stop = true;
					} catch (exception) {
						MessagesSteps.refresh();
					}
				}

				messagesLettersSteps.openBySubject(subject);

				messageFastReplySteps.clickButton('reply');

				composeEditorSteps.wait();
			},

			close: () => {
				cleanInbox();
			}
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
		let {testcase, name, open, skip} = test;

		describe(testcase, () => {
			it(name, () => {
				checkChangeSignature(test, options.signatures);
			});
		});
	});
});
