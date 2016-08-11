'use strict';

let { options = {
	name: 'AJAX. Ответ на письмо. Забытое вложение. Проверить отсутствие' +
	'попапа на полном ответе после появления попапа добавления аттачей из ' +
	'исходного письма'
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

const attach = 'file3.txt';

let anotherAccount;

describe(() => {
	before(() => {
		const features = [
			'reattach-to-reply',
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		];
		let { fields } = composeFieldsStore;

		Compose.auth();

		anotherAccount = authStore.credentials();

		var mail = new Mail({
			to: fields.to,
			subject: fields.subject,
			text: ''
		});

		mail.addAttach(attach);
		mail.send();

		Messages.features(features);
		Messages.open();

		letters.waitForNewestLetter();
		letters.openNewestLetter();

		messageToolbar.clickButton('reply');
		Compose.wait();

		composeFields.setFieldValue('cc',
			`${anotherAccount.login}@${anotherAccount.domain}`);

		composeEditor.writeMessage(
			composeEditorStore.classifierTest.lettersWithAttach[3]);

		composeControls.send();
		replyReattachLayer.wait();
	});

	after(() => {
		authStore.discard(anotherAccount.id).catch(() => {
			throw new Error('Не освободили аккаунт после себя!');
		});
	});

	it(options.name, () => {
		replyReattachLayer.cancel();
		SentPage.wait();
	});
});
