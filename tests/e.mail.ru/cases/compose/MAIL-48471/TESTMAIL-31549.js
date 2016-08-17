'use strict';


let { options = {
	name: 'НЕ AJAX. Написание письма. Забытое вложение. ' +
	'Проверить отсутствие попапа при отправке ' +
	'(тексты для которых не должен появляться попап)'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);

let SentPage = require('../../../steps/sent');

let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');

let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeControls = new ComposeControlsSteps();

let texts = composeEditorStore.classifierTest.lettersWithoutAttach;


describe(() => {
	before(() => {
		Compose.auth();
	});

	texts.forEach(
		(text) => {
			it(`${options.name}. ${text.slice(0,20)}...`, () => {
				Compose.features([
					'check-missing-attach',
					'disable-ballons',
					'no-collectors-in-compose'
				]);
				Compose.open();

				composeEditor.wait();

				composeFields.setFieldValue('subject', 'check attach');
				composeFields.setFieldValue('to', composeFieldsStore.fields.to);
				composeEditor.writeMessage(text);

				composeControls.send();

				SentPage.wait();
			});
		}
	);
});
