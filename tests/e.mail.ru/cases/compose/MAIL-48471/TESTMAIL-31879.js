'use strict';

let Messages = require('../../../steps/messages');
let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let FastreplySteps = require('../../../steps/message/fastreply');
let fastreplySteps = new FastreplySteps();

let Compose = require('../../../steps/compose');

let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();
let SentPage = require('../../../steps/sent');
let ComposeAttaches = require('../../../steps/compose/attaches');
let composeAttaches = new ComposeAttaches();

// mail
let Mail = require('../../../utils/mail');

const subject = 'TESTMAIL-31879 (TESTMAIL-31946 + ajax)';

describe('TESTMAIL-31879: AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для быстрого ответа с текстом в теле письма, с аттачем', done => {
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

		mail.send();

		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Messages.open();
		lettersSteps.openNewestLetter();
		fastreplySteps.clickButton('reply');

		composeEditor.wait();
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);
		composeAttaches.uploadAttach('file1.txt');

		messageToolbarSteps.clickFastreplyButton('reply');

		SentPage.wait();
	});
});
