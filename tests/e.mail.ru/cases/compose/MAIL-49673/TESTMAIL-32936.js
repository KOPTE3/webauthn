'use strict';

let { options = {
	name: 'Написание письма. Имена файлов в теме письма. AJAX. Проверка темы письма, ' +
	'когда добавили больше 3 файлов (добавляется "и еще Х файл[а][ов]")'
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

		if (options.compose2) {
			Messages.features([
				'compose2'
			]);
		}

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

		// прикрепить 4 файла
		for (index; index < 4; index++) {
			composeAttaches.uploadAttach(manyAttaches[index]);
			composeAttaches.hasAttach(manyAttaches[index]);
		}

		subject = `${manyAttaches[0]}, ${manyAttaches[1]}, ${manyAttaches[2]} и еще 1 файл`;
		composeFields.checkFieldValue('subject', subject);

		// прикрепить пятый файл
		composeAttaches.uploadAttach(manyAttaches[index]);
		composeAttaches.hasAttach(manyAttaches[index]);

		subject = `${manyAttaches[0]}, ${manyAttaches[1]}, ${manyAttaches[2]} и еще 2 файла`;
		composeFields.checkFieldValue('subject', subject);

		// прикрепить еще 3 файла
		for (++index; index < 8; index++) {
			composeAttaches.uploadAttach(manyAttaches[index]);
			composeAttaches.hasAttach(manyAttaches[index]);
		}

		subject = `${manyAttaches[0]}, ${manyAttaches[1]}, ${manyAttaches[2]} и еще 5 файлов`;
		composeFields.checkFieldValue('subject', subject);
	});
});
