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

let ComposeEmptyTextLayerSteps = require('../../../steps/layers/compose/emptyText');
let composeEmptyTextLayerSteps = new ComposeEmptyTextLayerSteps();

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbarSteps = new MessagesToolbarSteps();

let composeFieldsStore = require('../../../store/compose/fields');

describe(() => {
	before(() => {
		Compose.auth();
	});

	it('Написание письма. Временный адрес. Проверка, что после отправки письма ' +
		'от временного адреса на написании письма есть подпись', () => {
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
		let aliasId = SettingsAliases.createAlias();

		Messages.open();
		messagesToolbarSteps.clickButton('compose');
		Compose.wait();

		composeFields.expandField('from');
		composeFields.setDropdownValue('fromEmail', aliasId);
		composeFields.setFieldValue('subject', composeData.subject);
		composeFields.setFieldValue('to', composeData.to);

		composeEditor.messageContains(signature, true);

		composeControls.send();

		composeEmptyTextLayerSteps.show();
		composeEmptyTextLayerSteps.apply();

		SentSteps.isVisible();

		messagesToolbarSteps.clickButton('compose');
		Compose.wait();

		composeEditor.messageContains(signature);

		Compose.open();

		composeEditor.messageContains(signature);
	});
});
