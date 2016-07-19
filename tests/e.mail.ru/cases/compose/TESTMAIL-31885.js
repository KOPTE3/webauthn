'use strict';

let Messages = require('../../steps/messages');
let messagesLettersToolbarSteps = require('../../steps/messages/toolbar');

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let ComposeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let SentPage = require('../../steps/sent');
let composeAttaches = require('../../steps/compose/attaches');

// mail
let Mail = require('../../utils/mail');

const subject = 'TESTMAIL-31885';

describe('TESTMAIL-31885: AJAX. Черновики. Забытое вложение. ' +
	'Проверить отсутствие попапа при отправке с текстом и аттачем из шаблона ' +
	'(исходный шаблон с аттачем)', done => {
	before(() => {
		Compose.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = new ComposeFieldsStore();
		let {texts} = ComposeEditorStore;

		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Compose.open();

		composeEditor.wait();

		composeEditor.writeMessage(texts.withAttach);

		composeAttaches.uploadAttach('file1.txt');

		composeEditor.wait();

		composeControls.template();

		composeEditor.wait();

		composeControls.cancel();

		Messages.wait();
		messagesLettersToolbarSteps.clickButton('compose');
		composeEditor.wait();

		composeControls.applyTemplate();

		composeEditor.wait();

		composeFields.setFieldValue('to', fields.to);

		composeControls.send();

		SentPage.wait();
	});
});
