'use strict';

let { options = {
	name: 'Написание письма. Имена файлов в теме письма. AJAX. Проверка подставления ' +
	'имени файла в тему (латиница, кириллица, спецсимволы, длинное/короткое имя), ' +
	'когда файл прикреплен с компьютера.'
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

let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let composeControls = new ComposeControlsSteps();

let composeAttachesStore = require('../../../store/compose/attaches');

describe(() => {
	before(() => {
		Compose.auth();

		if (options.compose2) {
			Messages.features([
				'compose2'
			]);
		}
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

	composeAttachesStore.attaches.forEach((filename) => {
		it(options.name + ': ' + filename, () => {
			composeFields.checkFieldValue('subject', '');
			composeAttaches.uploadAttach(filename);
			composeAttaches.hasAttach(filename);
			composeFields.checkFieldValue('subject', filename);
		});
	});

	afterEach(() => {
		composeControls.cancel();
	});
});
