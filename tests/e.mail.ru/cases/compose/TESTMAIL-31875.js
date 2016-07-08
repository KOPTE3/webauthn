'use strict';

let Messages = require('../../steps/messages');
let lettersSteps = require('../../steps/messages/letters');
let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let messageToolbarSteps = require('../../steps/message/toolbar');

const subject = 'Тестовый текст';

describe('TESTMAIL-31875: AJAX. Ответ на письмо. Забытое вложение. Проверить ' +
'появление попапа для пересылки из тулбара с текстом и без аттача', done => {
	before(Compose.auth);

	it('Попап должен появится', () => {
		let { fields } = new ComposeFieldsStore();

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
		messageToolbarSteps.clickButton('forward');

		composeEditor.wait();
		composeFields.setFieldValue('subject', subject);
		composeFields.setFieldValue('to', fields.to);

		composeControls.send();
		missingAttachLayer.wait();

		missingAttachLayer.close();
		composeControls.cancel();
	});
});
