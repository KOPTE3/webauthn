'use strict';

let { options = {
	name: 'Написание письма. Имена файлов в теме письма. Проверка, что после удаления ' +
	'файла из письма, из темы удаляется имя файла, когда прикреплен один файл.'
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

		composeAttaches.removeAttach(filename);
		composeFields.checkFieldValue('subject', '');
	});
});
