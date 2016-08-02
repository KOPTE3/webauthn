'use strict';

let path = require('path');

let Messages = require('../../../steps/messages');
let Compose = require('../../../steps/compose');

let ComposeFields = require('../../../steps/compose/fields');
let composeFields = new ComposeFields();

let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();

let ComposeControls = require('../../../steps/compose/controls');
let composeControls = new ComposeControls();

let SettingsAliases = require('../../../steps/settings/aliases');
let SettingsSignature = require('../../../steps/settings/signature');
let SentSteps = require('../../../steps/sent');

let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbarSteps = new MessageToolbarSteps();

let ComposeEmptyTextLayerSteps = require('../../../steps/layers/compose/emptyText');
let composeEmptyTextLayerSteps = new ComposeEmptyTextLayerSteps();

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbarSteps = new MessagesToolbarSteps();

let composeFieldsStore = require('../../../store/compose/fields');
let foldersStore = require('../../../store/folders');

describe(() => {
	before(() => {
		Compose.auth();
	});

	it('Написание письма. Временный адрес. Проверка, что при ответе на письмо ' +
		'от временного адреса, подпись вырезается', () => {

		let { fields: composeData } = composeFieldsStore;
		let signature = 'Такая вот необычная подпись!';

		SettingsSignature.open();
		SettingsSignature.removeAllSignatures();
		SettingsSignature.createSignature({
			name: 'Иванов Иван',
			body: signature,
			selected: true
		});
		SettingsSignature.save();

		SettingsAliases.open();
		let aliasId = SettingsAliases.createAlias({
			folder: foldersStore.ids.inbox
		});

		Messages.open();
		messagesToolbarSteps.clickButton('compose');
		Compose.wait();

		composeFields.expandField('From');
		composeFields.setDropdownValue('fromEmail', aliasId);
		composeFields.setFieldValue('subject', composeData.subject);
		composeFields.setFieldValue('to', aliasId);

		composeEditor.messageContains(signature, true);

		composeControls.send();

		composeEmptyTextLayerSteps.show();
		composeEmptyTextLayerSteps.apply();

		SentSteps.isVisible();

		Messages.open();
		lettersSteps.openNewestLetter();

		messageToolbarSteps.clickButton('reply');
		Compose.wait();

		composeEditor.messageContains(signature, true);
	});
});
