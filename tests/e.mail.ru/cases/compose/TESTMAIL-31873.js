'use strict';

let Messages = require('../../steps/messages');
let LettersSteps = require('../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let Compose = require('../../steps/compose');
let ComposeFieldsStore = require('../../store/compose/fields');
let ComposeFields = require('../../steps/compose/fields');
let ComposeEditor = require('../../steps/compose/editor');
let СomposeControls = require('../../steps/compose/controls');
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let MessageToolbarSteps = require('../../steps/message/toolbar');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new СomposeControls();
let missingAttachLayer = new MissingAttachLayer();
let messageToolbarSteps = new MessageToolbarSteps();

let Actions = require('../../utils/actions');
let actions = new Actions();

const text = 'Тестовый текст';
const subject = 'Тест';

describe('TESTMAIL-31873: AJAX. Ответ на письмо. Забытое вложение. ' +
'Проверить появление попапа для полного ответа с текстом и без аттача', done => {
	before(() => {
		Compose.auth();
	});

	beforeEach(() => {
		let { fields } = new ComposeFieldsStore();

		Messages.open();

		let message = actions.sendMessage(
			fields.to,
			fields.from,
			subject,
			text
		);

		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Messages.open();
	});

	afterEach(() => {
		missingAttachLayer.close();
		composeControls.cancel();
	});

	composeEditorStore.lettersWithAttach.forEach(text => {
		it(text, () => {
			let { fields } = new ComposeFieldsStore();

			lettersSteps.openNewestLetter();
			messageToolbarSteps.clickButton('replyAll');

			composeEditor.wait();
			composeFields.setFieldValue('subject', 'check attach');
			composeFields.setFieldValue('to', fields.to);
			composeEditor.writeMessage(text);
			composeControls.send();
			missingAttachLayer.show();
		});
	});
});
