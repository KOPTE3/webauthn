'use strict';

let { options = {}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let ComposeFieldsSteps = require(`../../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../../steps/${composeFolder}/editor`);
let ComposeAttachesSteps = require(`../../../../steps/${composeFolder}/attaches`);

let MissingAttachLayer = require('../../../../steps/layers/missingAttach');
let NotifySteps = require('../../../../steps/notify');

let composeEditorStore = require('../../../../store/compose/editor');


let notify = new NotifySteps();
let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeAttaches = new ComposeAttachesSteps();
let missingAttachLayer = new MissingAttachLayer();

let filename = 'broken.scr';

module.exports = (steps) => {
	steps.open();

	composeFields.setFieldValue('to', steps.email);
	composeEditor.writeMessage(composeEditorStore.texts.withAttach);
	composeAttaches.uploadAttachWithoutCheck(filename);

	notify.wait('error', `Файл ${filename} заблокирован в целях безопасности.`, 'contains');

	steps.send();

	missingAttachLayer.wait();
	missingAttachLayer.checkTexts();
	missingAttachLayer.close();

	steps.cancel();
};
