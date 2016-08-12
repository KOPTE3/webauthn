'use strict';

let { options = {}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let ComposeFieldsSteps = require(`../../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../../steps/${composeFolder}/editor`);
let ComposeAttachesSteps = require(`../../../../steps/${composeFolder}/attaches`);
let SentPage = require('../../../../steps/sent');

let MissingAttachLayer = require('../../../../steps/layers/missingAttach');
let NotifySteps = require('../../../../steps/notify');

let composeEditorStore = require('../../../../store/compose/editor');
let composeFieldsStore = require('../../../../store/compose/fields');

let notify = new NotifySteps();
let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeAttaches = new ComposeAttachesSteps();
let missingAttachLayer = new MissingAttachLayer();

let filename = 'broken.scr';

module.exports = (steps) => {

	steps.open();

	let { fields } = composeFieldsStore;

	composeFields.setFieldValue('subject', 'check attach');
	composeFields.setFieldValue('to', fields.to);
	composeEditor.writeMessage(composeEditorStore.texts.test);

	steps.send();

	SentPage.wait();
};
