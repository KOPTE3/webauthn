'use strict';

let Message = require('../../../steps/message');
let Messages = require('../../../steps/messages');
let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let Compose = require('../../../steps/compose');
let ComposeControls = require('../../../steps/compose/controls');
let composeControls = new ComposeControls();
let composeFieldsStore = require('../../../store/compose/fields');
let actions = require('../../../utils/actions');
let SentPage = require('../../../steps/sent');

let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();

// mail
let Mail = require('../../../utils/mail');

const subject = 'TESTMAIL-32338';
const text = `Ок. Также по пятну отвода №5 у нас на одно замечание больше. 
				Эксперт просит предоставить аэродинамический расчет вентблока.
				И я в упор не вижу приложения 1 в ПЗ`;

const features = [
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark'
];

describe('AJAX. Черновики. Забытое вложение. ' +
	'Проверить отсутствие попапа при отправке из черновика ' +
	'(текст для которого попап появляться не должен)', () => {
	before(() => {
		Messages.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = composeFieldsStore;

		var mail = new Mail({
			to: fields.to,
			subject,
			text
		});

		mail.draft();

		Messages.features(features);
		Messages.open('/messages/drafts/');

		lettersSteps.openFirstCompose();
		Compose.wait();

		composeEditor.wait();

		composeControls.send();

		SentPage.wait();
	});
});