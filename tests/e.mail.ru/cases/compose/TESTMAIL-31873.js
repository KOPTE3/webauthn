'use strict';

let Messages = require('../../steps/messages');
let lettersSteps = require('../../steps/messages/letters');

let Compose = require('../../steps/compose');
let ComposeFieldsStore = require('../../store/compose/fields');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let actions = require('../../utils/actions');
let messageToolbarSteps = require('../../steps/message/toolbar');

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
