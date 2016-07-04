'use strict';

let Messages = require('../../steps/messages');
let lettersSteps = require('../../steps/messages/letters');
let fastanswerSteps = require('../../steps/message/fastanswer');

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let messageToolbarSteps = require('../../steps/message/toolbar');

const text = 'Тестовый текст';
const subject = 'Тест';

describe('TESTMAIL-31874: Ответ на письмо. Забытое вложение. Проверить появление ' +
' попапа для быстрого ответа с текстом и без аттача', done => {
	before(Compose.auth);

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
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
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
			fastanswerSteps.open();

			composeEditor.wait();
			composeFields.setFieldValue('subject', 'check attach');
			composeFields.setFieldValue('to', fields.to);
			composeEditor.writeMessage(text);

			messageToolbarSteps.clickFastreplyButton('replyAll');
			missingAttachLayer.show();
		});
	});
});
