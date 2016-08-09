'use strict';

let { options = {
	name: 'Написание письма. Имена файлов в теме письма. Проверка, что после ' +
	'удаления и повторного добавления файлов, тема письма меняется ' +
	'в соответствии с новыми именами файлов.'
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

let composeAttachesStore = require('../../../store/compose/attaches');

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
		const { manyAttaches } = composeAttachesStore;
		let index = 0;
		let subject;

		composeFields.checkFieldValue('subject', '');

		for (index; index < 5; index++) {
			composeAttaches.uploadAttach(manyAttaches[index]);
			composeAttaches.hasAttach(manyAttaches[index]);
		}

		subject = `${manyAttaches[0]}, ${manyAttaches[1]}, ${manyAttaches[2]} и еще 2 файла`;
		composeFields.checkFieldValue('subject', subject);

		for (index = 0; index < 5; index++) {
			composeAttaches.removeAttach(manyAttaches[index]);
		}

		composeAttaches.uploadAttach(manyAttaches[5]);
		composeAttaches.hasAttach(manyAttaches[5]);
		composeFields.checkFieldValue('subject', manyAttaches[5]);
	});
});
