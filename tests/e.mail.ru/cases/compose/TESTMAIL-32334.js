'use strict';

let Message = require('../../steps/message');
let Messages = require('../../steps/messages');
let lettersSteps = require('../../steps/messages/letters');
let fastreplySteps = require('../../steps/message/fastreply');

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let ComposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let messageToolbarSteps = require('../../steps/message/toolbar');
let SentPage = require('../../steps/sent');

// mail
let Mail = require('../../utils/mail');

const subject = 'TESTMAIL-32332';
const text = 'акже по пятну отвода №5 у нас на одно замечание больше. Эксперт просит ' +
	'предоставить аэродинамический расчет вентблока. И я в упор не вижу приложения 1 в ПЗ';


const features = [
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark'
];

describe('TESTMAIL-32334: AJAX. Ответ на письмо. ' +
	'Забытое вложение. Проверить отсутствие попапа на ' +
	'быстрой пересылке (текст, для которого попап не должен появляться)', () => {
	before(() => {
		Messages.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = new ComposeFieldsStore();

		var mail = new Mail({
			to: fields.to,
			subject,
			text
		});

		mail.send();

		Messages.features(features);
		Messages.open();
		lettersSteps.openNewestLetter();

		Message.features(features);
		Message.refresh();
		Message.wait();

		fastreplySteps.clickButton('forward');

		composeFields.setFieldValue('to', fields.to);

		messageToolbarSteps.clickFastreplyButton('resend');

		SentPage.wait();
	});
});
