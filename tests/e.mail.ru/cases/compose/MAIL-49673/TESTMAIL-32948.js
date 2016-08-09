'use strict';

let { options = {
	name: 'Ответ на письмо. Имена файлов в теме письма. AJAX. Проверка, ' +
	'что при ответе на письмо с пустой темой с AJAX чтения, ' +
	'когда добавляем файл, тема не меняется.'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let Messages = require('../../../steps/messages');
let Message = require('../../../steps/message');

let LettersSteps = require('../../../steps/messages/letters');
let letters = new LettersSteps();

let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbar = new MessageToolbarSteps();

let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let composeFields = new ComposeFieldsSteps();

let ComposeAttachesSteps = require(`../../../steps/${composeFolder}/attaches`);
let composeAttaches = new ComposeAttachesSteps();

let composeFieldsStore = require('../../../store/compose/fields');

let Mail = require('../../../utils/mail');

const filename = 'test.txt';

describe(() => {
	before(() => {
		Compose.auth();

		let { fields } = composeFieldsStore;

		// Присылаем письмо себе
		var mail = new Mail({
			to: fields.to,
			subject : '',
			text: ''
		});

		mail.send();

		if (options.compose2) {
			Messages.features([
				'compose2'
			]);
		}

		Messages.open();
		letters.waitForNewestLetter();
		letters.openNewestLetter();

		if (options.readmsgnoajax) {
			Message.refresh();
		}

		// нажимаем на переслать в общем тулбаре
		messageToolbar.clickButton('reply');

		if (options.noajax) {
			Compose.refresh();
		} else {
			Compose.wait();
		}
	});

	it(options.name, () => {
		composeFields.checkFieldValue('subject', 'Re:');

		composeAttaches.uploadAttach(filename);
		composeAttaches.hasAttach(filename);
		composeFields.checkFieldValue('subject', 'Re:');
	});
});
