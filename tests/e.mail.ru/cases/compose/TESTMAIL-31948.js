'use strict';

let Messages = require('../../steps/messages');
let LettersSteps = require('../../steps/messages/letters');
let lettersSteps = new LettersSteps();
let FastreplySteps = require('../../steps/message/fastreply');
let fastreplySteps = new FastreplySteps();

let Compose = require('../../steps/compose');
let ComposeFields = require('../../steps/compose/fields');
let composeFields = new ComposeFields();
let composeEditorStore = require('../../store/compose/editor');
let composeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let MessageToolbarSteps = require('../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();
let SentPage = require('../../steps/sent');
let ComposeAttaches = require('../../steps/compose/attaches');
let composeAttaches = new ComposeAttaches();

// mail
let Mail = require('../../utils/mail');

const subject = 'TESTMAIL-31948';

describe('TESTMAIL-31948: НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для быстрой пересылки с текстом в цитате, ' +
	'с аттачем (добавление аттача на пересылке)', done => {
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
		Messages.refresh();
		lettersSteps.openNewestLetter();

		fastreplySteps.clickButton('forward');

		composeFields.setFieldValue('to', fields.to);

		composeAttaches.uploadAttach('file1.txt');
		
		messageToolbarSteps.clickFastreplyButton('resend');

		SentPage.wait();
	});
});
