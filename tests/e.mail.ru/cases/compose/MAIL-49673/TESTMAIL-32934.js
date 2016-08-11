'use strict';

let { options = {
	name: 'Написание письма. Имена файлов в теме письма. AJAX. Проверка подставления ' +
	'имени файла в тему (латиница, кириллица, спецсимволы, длинное/короткое имя), ' +
	'когда файл прикреплен с почтофайлов.'
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

let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let composeControls = new ComposeControlsSteps();

let composeAttachesStore = require('../../../store/compose/attaches');
let composeFieldsStore = require('../../../store/compose/fields');

let Mail = require('../../../utils/mail');

const attaches = composeAttachesStore.attaches.filter((filename) => !/\.jpg$/.test(filename));

describe(() => {
	before(() => {
		Compose.auth();

		// Готовим файлы
		let { fields } = composeFieldsStore;

		var mail = new Mail({
			to: fields.to,
			subject: fields.subject,
			text: ''
		});

		attaches.forEach((filename) => mail.addAttach(filename));
		mail.send();

		Messages.open();
		letters.waitForNewestLetter();

		// новый попап прикрепления из облака
		let features = [
			'compose-popup-files',
			'subject-from-attachments'
		];

		if (options.compose2) {
			features.push('compose2');
		}

		Messages.features(features);
	});

	beforeEach(() => {
		if (options.noajax) {
			Compose.open();
		} else {
			Messages.open();
			messagesToolbar.clickButton('compose');
			Compose.wait();
		}
	});

	attaches.forEach((filename) => {
		it(options.name + ': ' + filename, () => {
			composeFields.checkFieldValue('subject', '');
			composeAttaches.attachFromMail(filename);
			composeAttaches.hasAttach(filename);
			composeFields.checkFieldValue('subject', filename);
		});
	});

	afterEach(() => {
		composeControls.cancel();
	});
});
