'use strict';

let { options = {
	name: 'НЕ AJAX. Написание письма. Забытое вложение. Проверить отсутствие' +
	'попапа если слово-маркер есть в подписи'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let Messages = require('../../../steps/messages');
let Message = require('../../../steps/message');
let SentPage = require('../../../steps/sent');

let LettersSteps = require('../../../steps/messages/letters');
let letters = new LettersSteps();

let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbar = new MessageToolbarSteps();

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbar = new MessagesToolbarSteps();

let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let composeControls = new ComposeControlsSteps();

let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let composeFields = new ComposeFieldsSteps();

let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let composeEditor = new ComposeEditorSteps();

let ComposeReplyReattachLayer = require('../../../steps/layers/compose/replyReattach');
let replyReattachLayer = new ComposeReplyReattachLayer();

let composeFieldsStore = require('../../../store/compose/fields');
let authStore = require('../../../store/authorization');
let composeEditorStore = require('../../../store/compose/editor');

let Mail = require('../../../utils/mail');
let messagesUtils = require('../../../utils/messages');
let messageUtils = require('../../../utils/message');

let actions = require('../../../utils/actions');

const attach = 'file3.txt';

let anotherAccount;

describe(() => {
	before(() => {
		const features = [
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		];

		if (options.compose2) {
			features.unshift('compose2');
		}

		Compose.auth();

		actions.setSignatures([composeEditorStore.texts.withAttach]);

		Compose.features(features);
		Compose.open();
	});

	it(options.name, () => {
		let { fields } = composeFieldsStore;

		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', fields.to);
		composeEditor.writeMessage(composeEditorStore.texts.test);
		composeControls.send();
		SentPage.wait();
	});
});
