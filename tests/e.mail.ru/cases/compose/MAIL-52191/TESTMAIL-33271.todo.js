'use strict';

let { options = {
	name: 'НЕ AJAX. Написание письма. Забытое вложение. Проверить' +
	' отсутствие попапа если слово-маркер есть в подписи'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let SentPage = require('../../../steps/sent');

let composeFieldsStore = require('../../../store/compose/fields');
let composeEditorStore = require('../../../store/compose/editor');
let actions = require('../../../utils/actions');

let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeControls = new ComposeControlsSteps();


describe(() => {
	before(() => {
		// const features = [
		// 	'check-missing-attach',
		// 	'disable-ballons',
		// 	'no-collectors-in-compose',
		// 	'disable-fastreply-landmark'
		// ];
		//
		// if (options.compose2) {
		// 	features.unshift('compose2');
		// }
		//
		// Compose.auth();
		//
		// actions.setSignatures([composeEditorStore.texts.withAttach]);
		//
		// Compose.features(features);
		// Compose.open();
	});

	it(options.name, () => {
		// let { fields } = composeFieldsStore;
		//
		// composeFields.setFieldValue('subject', 'check attach');
		// composeFields.setFieldValue('to', fields.to);
		// composeEditor.writeMessage(composeEditorStore.texts.test);
		// composeControls.send();
		// SentPage.wait();
	});
});
