'use strict';

let ComposeEditorControlsSteps = require('../../../steps/compose/editorControls');
let Compose = require('../../../steps/compose');
let Messages = require('../../../steps/messages');
let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let Compose2EditorSteps = require('../../../steps/compose2/editor');
let ComposeFieldsSteps = require('../../../steps/compose/fields');
let ComposeControlsSteps = require('../../../steps/compose/controls');
let ComposeEditor = require('../../../steps/compose/editor');

let actions = require('../../../utils/actions');
let composeFieldsStore = require('../../../store/compose/fields');

let createSignature = require('./meta/createSignature');

let composeEditorControls = new ComposeEditorControlsSteps();
let messagesToolbar = new MessagesToolbarSteps();
let compose2Editor = new Compose2EditorSteps();
let composeFields = new ComposeFieldsSteps();
let composeControls = new ComposeControlsSteps();
let composeEditor = new ComposeEditor();

let {auth, resetSignatures, cleanInbox} = require('./meta');

let createTemplate = function () {
	let { fields } = composeFieldsStore;

	Messages.open();
	messagesToolbar.clickButton('compose');
	Compose.wait();

	compose2Editor.noInline();

	composeEditorControls.toggleSignature();
	composeEditorControls.isVisibleSignature();
	composeEditorControls.clickSignature(1);

	composeFields.setFieldValue('to', fields.to);
	composeFields.setFieldValue('subject', fields.subject);
	compose2Editor.writeMessage(fields.text);

	composeControls.template();

	Messages.open();
	messagesToolbar.clickButton('compose');
};

let options = {
	signatures: [
		{image: false, isDefault: true},
		{image: true}
	],
	tests: [
		{
			testcase: 'TESTMAIL-33049',
			name: '	Черновики. Шаблоны. HTML подпись. AJAX. ' +
			'Проверка отображения HTML подписи из шаблона ' +
			'на написании письма (на написании обычная подпись).',
			open: () => {
				createTemplate();

				Messages.open();
				messagesToolbar.clickButton('compose');
				Compose.wait();
			}
		},
		{
			testcase: 'TESTMAIL-33051',
			name: 'Черновики. Шаблоны. HTML подпись. НЕ AJAX. ' +
			'Проверка отображения HTML подписи из шаблона ' +
			'на написании письма (на написании обычная подпись)',
			open: () => {
				Compose.open();
				Compose.wait();
			}
		}
	]
};

describe(() => {
	before(() => {
		auth();
		resetSignatures();

		createSignature(options);
	});

	options.tests.forEach(({ testcase, name, open }) => {
		describe(testcase, () => {
			it(name, () => {
				open();

				compose2Editor.noInline();
				composeControls.applyTemplate();
				composeEditor.wait();
				compose2Editor.hasInline();
			});
		});
	});

	after(() => {
		cleanInbox();
	});
});
