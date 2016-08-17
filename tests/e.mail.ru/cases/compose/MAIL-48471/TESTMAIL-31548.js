'use strict';


let { options = {
	name: 'НЕ AJAX. Написание письма. Забытое вложение. ' +
	'Проверить появление попапа при отправке текстов ' +
	'(все тексты для которых должен появляться попап, проверка классификатора)'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeFields = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditor = require(`../../../steps/${composeFolder}/editor`);
let ComposeControls = require(`../../../steps/${composeFolder}/controls`);
let MissingAttachLayer = require('../../../steps/layers/missingAttach');

let SentPage = require('../../../steps/sent');

let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new ComposeControls();
let missingAttachLayer = new MissingAttachLayer();

let texts = composeEditorStore.classifierTest.lettersWithAttach;


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

				missingAttachLayer.wait();
				missingAttachLayer.checkTexts();
				missingAttachLayer.cancel();

				composeControls.cancel();

			});
		}
	);
});
