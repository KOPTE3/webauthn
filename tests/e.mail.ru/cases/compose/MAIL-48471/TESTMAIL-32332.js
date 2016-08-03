'use strict';

let Messages = require('../../../steps/messages');
let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();
let FastreplySteps = require('../../../steps/message/fastreply');
let fastreplySteps = new FastreplySteps();

let Compose = require('../../../steps/compose');
let ComposeFields = require('../../../steps/compose/fields');
let composeFields = new ComposeFields();
let composeFieldsStore = require('../../../store/compose/fields');
let actions = require('../../../utils/actions');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();
let SentPage = require('../../../steps/sent');

// mail
let Mail = require('../../../utils/mail');

const subject = 'TESTMAIL-32332';

const text = 'акже по пятну отвода №5 у нас на одно замечание больше. Эксперт просит ' +
	'предоставить аэродинамический расчет вентблока. И я в упор не вижу приложения 1 в ПЗ';


describe('AJAX. Ответ на письмо. ' +
	'Забытое вложение. Проверить отсутствие попапа на ' +
	'быстрой пересылке (текст, для которого попап не должен появляться)', () => {
	before(() => {
		Compose.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = composeFieldsStore;

		var mail = new Mail({
			to: fields.to,
			subject,
			text
		});

		mail.send();

		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Messages.open();
		lettersSteps.openNewestLetter();

		fastreplySteps.clickButton('forward');

		composeFields.setFieldValue('to', fields.to);

		messageToolbarSteps.clickFastreplyButton('resend');

		SentPage.wait();
	});
});
