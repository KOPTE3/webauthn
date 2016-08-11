'use strict';

let { options = {
	name: 'AJAX. Написание письма. Забытое вложение. ' +
	'Проверить появление попапа если в письме был заблокирован аттач'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeAttachesSteps = require(`../../../steps/${composeFolder}/attaches`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let NotifySteps = require('../../../steps/notify');

let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');
let authStore = require('../../../store/authorization');

let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeAttaches = new ComposeAttachesSteps();
let composeControls = new ComposeControlsSteps();
let missingAttachLayer = new MissingAttachLayer();
let notify = new NotifySteps();


describe(() => {
	before(() => {
		const features = [
			'reattach-to-reply',
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		];

		Compose.auth();
		Compose.features(features);
		Compose.open();
	});

	it(options.name, () => {
		const { fields } = composeFieldsStore;
		const filename = 'broken.scr';

		composeFields.setFieldValue('to', fields.to);
		composeFields.setFieldValue('subject', fields.subject);
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);

		composeAttaches.uploadAttach(filename);
		notify.wait('error', `Файл ${filename} заблокирован в целях безопасности.`, 'contains');

		composeControls.send();
		missingAttachLayer.wait();
		missingAttachLayer.checkTexts();
	});
});
