'use strict';

let Messages = require('../../../steps/messages');
let LettersSteps = require('../../../steps/messages/letters');
let Compose = require('../../../steps/compose');
let composeFieldsStore = require('../../../store/compose/fields');
let composeEditorStore = require('../../../store/compose/editor');
let ComposeFields = require('../../../steps/compose/fields');
let ComposeEditor = require('../../../steps/compose/editor');
let ComposeControls = require('../../../steps/compose/controls');
let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let actions = require('../../../utils/actions');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new ComposeControls();
let missingAttachLayer = new MissingAttachLayer();
let messageToolbarSteps = new MessageToolbarSteps();
let lettersSteps = new LettersSteps();

const text = 'Тестовый текст';
const subject = 'Тест';

describe('TESTMAIL-31873: AJAX. Ответ на письмо. Забытое вложение. ' +
'Проверить появление попапа для полного ответа с текстом и без аттача', done => {
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
			text
		);

		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Messages.open();
		lettersSteps.openNewestLetter();
		messageToolbarSteps.clickButton('replyAll');

		composeEditor.wait();
		composeFields.setFieldValue('subject', 'check attach');
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);
		composeControls.send();
		missingAttachLayer.wait();

		missingAttachLayer.close();
		composeControls.cancel();
	});
});
