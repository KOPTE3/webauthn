'use strict';

let { options = {}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let ComposeFieldsSteps = require(`../../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../../steps/${composeFolder}/editor`);
let SentPage = require('../../../../steps/sent');

let NotifySteps = require('../../../../steps/notify');

let composeEditorStore = require('../../../../store/compose/editor');
let composeFieldsStore = require('../../../../store/compose/fields');

let notify = new NotifySteps();
let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();

module.exports = (steps) => {
	steps.open();

	let { fields } = composeFieldsStore;

	composeFields.setFieldValue('subject', 'check attach');
	composeFields.setFieldValue('to', fields.to);
	composeEditor.writeMessage(composeEditorStore.texts.test);

	steps.send();

	SentPage.wait();
};
