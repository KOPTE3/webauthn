'use strict';

let { options = {
	name: 'Написание письма. Имена файлов в теме письма. Проверка, что если ' +
	'сами очистили тему, то при добавлении файла его имя не добавляется в тему письма'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let Messages = require('../../../steps/messages');

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbar = new MessagesToolbarSteps();

let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let composeFields = new ComposeFieldsSteps();

let ComposeAttachesSteps = require(`../../../steps/${composeFolder}/attaches`);
let composeAttaches = new ComposeAttachesSteps();

const filename = 'test.txt';
const filename2 = 'test1.png';

describe(() => {
	before(() => {
		Compose.auth();

		let features = ['subject-from-attachments'];

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

		composeAttaches.uploadAttach(filename);
		composeAttaches.hasAttach(filename);
		composeFields.checkFieldValue('subject', filename);

		composeFields.setFieldValue('subject', '');

		composeAttaches.uploadAttach(filename2);
		composeAttaches.hasAttach(filename2);
		composeFields.checkFieldValue('subject', '');
	});
});
