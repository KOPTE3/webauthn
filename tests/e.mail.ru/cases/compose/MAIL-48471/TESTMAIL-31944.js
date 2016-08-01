'use strict';

let Messages = require('../../../steps/messages');
let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let Compose = require('../../../steps/compose');
let ComposeFields = require('../../../steps/compose/fields');
let composeFields = new ComposeFields();
let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeControls = require('../../../steps/compose/controls');
let composeControls = new ComposeControls();
let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');
let actions = require('../../../utils/actions');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();
let SentPage = require('../../../steps/sent');

// mail
let Mail = require('../../../utils/mail');

const subject = 'TESTMAIL-31944';

describe('TESTMAIL-31944: НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для полной пересылки с текстом в цитате, с аттачем ' +
	'(исходное письмо с аттачем)', done => {
	before(() => {
		Compose.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = composeFieldsStore;

		let mail = new Mail({
			to: fields.to,
			subject,
			text: composeEditorStore.texts.withAttach
		});

		mail.addAttach('file1.txt');

		mail.send();

		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Messages.open();
		lettersSteps.openNewestLetter();
		messageToolbarSteps.clickButton('forward');

		composeEditor.wait();
		Compose.refresh();
		composeEditor.wait();

		composeFields.clickField('to');
		composeFields.setFieldValue('to', fields.to);

		composeControls.send();

		SentPage.wait();
	});
});
