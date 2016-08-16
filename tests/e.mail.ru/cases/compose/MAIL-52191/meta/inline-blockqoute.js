'use strict';

let { options = {} } = module.parent;


let composeFolder = 'compose2';

let Compose = require(`../../../../steps/${composeFolder}`);
let ComposeFieldsSteps = require(`../../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../../steps/${composeFolder}/editor`);
let ComposeAttachesSteps = require(`../../../../steps/${composeFolder}/attaches`);
let ComposeControlsSteps = require(`../../../../steps/${composeFolder}/controls`);
let SentPage = require('../../../../steps/sent');

let Messages = require('../../../../steps/messages');
let MessageToolbarSteps = require('../../../../steps/message/toolbar');
let LettersSteps = require('../../../../steps/messages/letters');


let Login = require('../../../../steps/login');
let LoginFormSteps = require('../../../../steps/login/form');

let composeEditorStore = require('../../../../store/compose/editor');

let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeAttaches = new ComposeAttachesSteps();
let composeControls = new ComposeControlsSteps();

let messageToolbar = new MessageToolbarSteps();
let letters = new LettersSteps();

let loginFormSteps = new LoginFormSteps();

const features = [
	'reattach-to-reply',
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark',
	'compose2',
	'compose2-inlinefromeditor'
];

const subject = 'Тест';

module.exports = (steps) => {
	const filename = '1exp.JPG';

	Compose.features(features);
	Compose.open();

	if (steps.response) {
		composeFields.setFieldValue('to', steps.email);
		composeFields.setFieldValue('subject', subject);
		composeAttaches.attachInline(filename);
		composeControls.send();
		SentPage.wait();

		Messages.features(features);
		Messages.open();

		letters.waitForNewestLetter();
		letters.openNewestLetter();
	}

	steps.open();

	if (steps.response) {
		composeEditor.hasInlineInBlockQuote();
	} else {
		composeFields.setFieldValue('to', steps.email);
	}

	composeEditor.writeMessage(composeEditorStore.texts.withAttach);
	composeAttaches.attachInline(filename);

	steps.send();

	SentPage.wait();
};
