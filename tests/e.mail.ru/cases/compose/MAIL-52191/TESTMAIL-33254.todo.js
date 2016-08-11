'use strict';

let { options = {
	name: 'AJAX. Написание письма. Забытое вложение. ' +
	'Проверить отсутствие попапа в письме с инлайн аттачем'
}} = module.parent;

let composeFolder = 'compose2';

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeAttachesSteps = require(`../../../steps/${composeFolder}/attaches`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let SentPage = require('../../../steps/sent');

let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');

let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeAttaches = new ComposeAttachesSteps();
let composeControls = new ComposeControlsSteps();

describe(() => {
	before(() => {
		const features = [
			'reattach-to-reply',
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark',
			'compose2',
			'compose2-inlinefromeditor'
		];

		Compose.auth();
		Compose.features(features);
		Compose.open();
	});

	it(options.name, () => {
		const { fields } = composeFieldsStore;
		const filename = 'pic.jpg';

		composeFields.setFieldValue('to', fields.to);
		composeFields.setFieldValue('subject', fields.subject);
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);

		// todo: wait till inline attaches are on all users
		// composeAttaches.attachInline(filename);
		// composeControls.send();
		// SentPage.wait();
	});
});
