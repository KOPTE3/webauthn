'use strict';

let Messages = require('../../steps/messages');
let lettersSteps = require('../../steps/messages/letters');
let fastreplySteps = require('../../steps/message/fastreply');

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let messageToolbarSteps = require('../../steps/message/toolbar');
let SentPage = require('../../steps/sent');
let composeAttaches = require('../../steps/compose/attaches');

// mail
let Mail = require('../../utils/mail');

const subject = 'TESTMAIL-31879 (TESTMAIL-31946 + ajax)';

describe('TESTMAIL-31879: AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для быстрого ответа с текстом в теле письма, с аттачем', done => {
	before(() => {
		Compose.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = new ComposeFieldsStore();

		var mail = new Mail({
			to: fields.to,
			subject,
			text: composeEditorStore.texts.withoutAttach
		});

		mail.send();

		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Messages.open();
		lettersSteps.openNewestLetter();
		fastreplySteps.clickButton('reply');

		composeEditor.wait();
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);
		composeAttaches.uploadAttach('file1.txt');

		messageToolbarSteps.clickFastreplyButton('reply');

		SentPage.wait();
	});
});
