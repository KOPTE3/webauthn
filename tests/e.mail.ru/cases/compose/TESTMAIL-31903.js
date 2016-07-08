'use strict';

let Messages = require('../../steps/messages');
let lettersSteps = require('../../steps/messages/letters');
let fastreplySteps = require('../../steps/message/fastreply');

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let messageToolbarSteps = require('../../steps/message/toolbar');

const subject = 'Тестовый текст';

describe('TESTMAIL-31903: AJAX. Ответ на письмо. Забытое вложение. Проверить ' +
'появление попапа для быстрой пересылки с текстом и без аттача', done => {
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
		fastreplySteps.clickButton('forward');

		composeEditor.wait();
		composeFields.setFieldValue('subject', subject);
		composeFields.setFieldValue('to', fields.to);

		messageToolbarSteps.clickFastreplyButton('resend');
		missingAttachLayer.wait();

		missingAttachLayer.close();
		messageToolbarSteps.clickFastreplyButton('cancel');
	});
});
