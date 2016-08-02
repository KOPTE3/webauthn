'use strict';

let Messages = require('../../../steps/messages');
let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();
let Compose = require('../../../steps/compose');
let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeControls = require('../../../steps/compose/controls');
let composeControls = new ComposeControls();
let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let missingAttachLayer = new MissingAttachLayer();
let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');
let actions = require('../../../utils/actions');


const subject = 'Тестовый текст';

describe('TESTMAIL-31952: НЕ AJAX. Черновики. Забытое вложение. Проверить ' +
' появление попапа при отправке с текстом из шаблона', () => {
	before(() => {
		Compose.auth();
	});

	it('Попап должен быть показан', () => {
		Messages.open();

		let { fields } = composeFieldsStore;

		actions.saveDraft(
			fields.to,
			fields.from,
			subject,
			composeEditorStore.texts.withAttach,
			true
		);

		Messages.features([
			'disable-ballons'
		]);

		Messages.open('/messages/templates/');
		lettersSteps.openFirstCompose();
		composeEditor.wait();

		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Compose.refresh();
		composeEditor.wait();
		composeControls.send();
		missingAttachLayer.wait();

		missingAttachLayer.close();
		composeControls.cancel();
	});
});
