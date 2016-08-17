'use strict';

let Messages = require('../../../steps/messages');

let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let FastreplySteps = require('../../../steps/message/fastreply');
let fastreplySteps = new FastreplySteps();

let Compose = require('../../../steps/compose');
let ComposeFields = require('../../../steps/compose/fields');
let composeFields = new ComposeFields();
let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let missingAttachLayer = new MissingAttachLayer();
let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');
let actions = require('../../../utils/actions');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();

// SentPage
let SentPage = require('../../../steps/sent');

const testText = 'Тестовый текст';
const subject = 'TESTMAIL-31903';

describe('AJAX. Ответ на письмо. Забытое вложение. Проверить ' +
'появление попапа для быстрой пересылки с текстом и без аттача', () => {
	before(() => {
		Compose.auth();
	});

	it('Попап должен появится', () => {
		let { fields } = composeFieldsStore;

		Messages.open();

		actions.sendMessage(
			fields.to,
			fields.from,
			subject,
			composeEditorStore.texts.withAttach
		);

		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Messages.open();
		lettersSteps.openNewestLetter();
		fastreplySteps.clickButton('forward');

		composeEditor.wait();
		composeFields.setFieldValue('subject', testText);
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(testText);

		messageToolbarSteps.clickFastreplyButton('resend');

		SentPage.wait();
	});
});
