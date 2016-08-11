'use strict';

let { options = {
	name: 'Написание письма. Имена файлов в теме письма. AJAX. Проверка темы письма, ' +
	'когда добавили 3 файла (имена добавляются через запятую), ' +
	'когда файлы прикреплены с компьютера, облака и почтофайлов.'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let Messages = require('../../../steps/messages');

let LettersSteps = require('../../../steps/messages/letters');
let letters = new LettersSteps();

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbar = new MessagesToolbarSteps();

let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let composeFields = new ComposeFieldsSteps();

let ComposeAttachesSteps = require(`../../../steps/${composeFolder}/attaches`);
let composeAttaches = new ComposeAttachesSteps();

let composeFieldsStore = require('../../../store/compose/fields');

let Mail = require('../../../utils/mail');
let messagesUtils = require('../../../utils/messages');
let messageUtils = require('../../../utils/message');

const mailattach = 'file1.txt';
const cloudattach = 'file2.txt';
const attach = 'file3.txt';

describe(() => {
	before(() => {
		Compose.auth();

		// Готовим облако и почтофайлы
		let { fields } = composeFieldsStore;

		var mail = new Mail({
			to: fields.to,
			subject: fields.subject,
			text: ''
		});

		mail.addAttach(mailattach);
		mail.addAttach(cloudattach);
		mail.send();

		Messages.open();
		letters.waitForNewestLetter();

		let messageId = messagesUtils.getLetterIdBySubject(fields.subject);

		messageUtils.saveAllAttachesToCloud(messageId);

		// новый попап прикрепления из облака
		let features = [
			'compose-popup-files',
			'subject-from-attachments'
		];

		if (options.compose2) {
			features.push('compose2');
		}

		Messages.features(features);

		if (options.noajax) {
			Compose.open();
		} else {
			Messages.open();
			messagesToolbar.clickButton('compose');
			Compose.wait();
		}
	});

	it(options.name, () => {
		composeFields.checkFieldValue('subject', '');
		composeAttaches.uploadAttach(attach);
		composeAttaches.hasAttach(attach);
		composeFields.checkFieldValue('subject', attach);

		composeAttaches.attachFromCloud(cloudattach);
		composeAttaches.hasAttach(cloudattach);
		composeFields.checkFieldValue('subject', `${attach}, ${cloudattach}`);

		composeAttaches.attachFromMail(mailattach);
		composeAttaches.hasAttach(mailattach);
		composeFields.checkFieldValue('subject', `${attach}, ${cloudattach}, ${mailattach}`);
	});
});
