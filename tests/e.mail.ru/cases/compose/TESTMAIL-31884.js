'use strict';

let Messages = require('../../steps/messages');
let lettersSteps = require('../../steps/messages/letters');
let Compose = require('../../steps/compose');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');

const subject = 'TESTMAIL-31884';

describe('TESTMAIL-31884: AJAX. Черновики. Забытое вложение. Проверить появление попапа при' +
' отправке с текстом из черновика', done => {
	before(() => {
		Compose.auth();
	});

	it('Попап должен быть показан', () => {
		Messages.open();

		let { fields } = new ComposeFieldsStore();

		actions.saveDraft(
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

		Messages.open('/messages/drafts/');
		lettersSteps.openNewestLetter();
		composeEditor.wait();

		composeEditor.wait();
		composeControls.send();
		missingAttachLayer.wait();

		missingAttachLayer.close();
		composeControls.cancel();
	});
});
