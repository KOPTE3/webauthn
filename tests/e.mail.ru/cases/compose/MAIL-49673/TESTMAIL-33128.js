'use strict';

let { options = {
	name: 'Черновики/Шаблоны. Имена файлов в теме письма. Проверка, ' +
	'что в сохраненном письме в черновик/шаблон в тему не подставляется имя файла'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let Messages = require('../../../steps/messages');

let LettersSteps = require('../../../steps/messages/letters');
let letters = new LettersSteps(options.compose2);

let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let composeFields = new ComposeFieldsSteps();

let ComposeAttachesSteps = require(`../../../steps/${composeFolder}/attaches`);
let composeAttaches = new ComposeAttachesSteps();

let composeFieldsStore = require('../../../store/compose/fields');

let Mail = require('../../../utils/mail');
let messagesUtils = require('../../../utils/messages');
let messageUtils = require('../../../utils/message');

const folders = [
	{type: 'drafts', id: 500001},
	{type: 'templates', id: 500006}
];

const filename = 'test.txt';
const filename2 = 'test1.png';
let messageId;

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

		mail.addAttach(filename);
		mail.send();

		let features = ['subject-from-attachments'];

		if (options.compose2) {
			features.push('compose2');
		}

		Messages.features(features);

		Messages.open();
		letters.waitForNewestLetter();

		messageId = messagesUtils.getLetterIdBySubject('');
	});

	folders.forEach(({type, id}) => {
		it(options.name + ': ' + type, () => {
			messageUtils.moveToFolder(messageId, id);
			Messages.open(`/messages/${type}`);
			letters.openFirstCompose();

			composeFields.checkFieldValue('subject', '');
			composeAttaches.hasAttach(filename);

			composeAttaches.uploadAttach(filename2);
			composeAttaches.hasAttach(filename2);
			composeFields.checkFieldValue('subject', '');
		});
	});
});
