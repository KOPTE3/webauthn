'use strict';

let Message = require('../../steps/message');
let Messages = require('../../steps/messages');
let LettersSteps = require('../../steps/messages/letters');
let lettersSteps = new LettersSteps();
let ComposeControls = require('../../steps/compose/controls');
let composeControls = new ComposeControls();
let ComposeFields = require('../../steps/compose/fields');
let composeFields = new ComposeFields();
let сomposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let MessageToolbarSteps = require('../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();
let SentPage = require('../../steps/sent');

let Compose = require('../../steps/compose');

let composeEditorStore = require('../../store/compose/editor');

// mail
let Mail = require('../../utils/mail');

const subject = 'TESTMAIL-32331';

const features = [
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark'
];

describe('TESTMAIL-32331: AJAX. Ответ на письмо. Забытое вложение.' +
	'Проверить отсутствие попапа на полной пересылке ' +
	'(текст, для которого попап не должен появляться)', () => {
	before(() => {
		Messages.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = сomposeFieldsStore;

		var mail = new Mail({
			to: fields.to,
			subject,
			text: composeEditorStore.texts.withoutAttach
		});

		mail.send();

		Messages.features(features);
		Messages.open();
		lettersSteps.openNewestLetter();
		
		messageToolbarSteps.clickButton('forward');

		Compose.wait();

		composeFields.setFieldValue('to', fields.to);

		composeControls.send();

		SentPage.wait();
	});
});
