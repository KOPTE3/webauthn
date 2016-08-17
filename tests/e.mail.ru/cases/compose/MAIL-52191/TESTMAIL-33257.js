'use strict';

let { options = {
	name: 'AJAX. Ответ на письмо. Забытое вложение. Проверить отсутствие' +
	'попапа на полном ответе после появления попапа добавления аттачей из ' +
	'исходного письма'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Messages = require('../../../steps/messages');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let LettersSteps = require('../../../steps/messages/letters');
let SentPage = require('../../../steps/sent');

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeReplyReattachLayer = require('../../../steps/layers/compose/replyReattach');

let authStore = require('../../../store/authorization');
let composeFieldsStore = require('../../../store/compose/fields');
let composeEditorStore = require('../../../store/compose/editor');

let Mail = require('../../../utils/mail');

let letters = new LettersSteps();
let messageToolbar = new MessageToolbarSteps();
let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeControls = new ComposeControlsSteps();
let replyReattachLayer = new ComposeReplyReattachLayer();

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

		if (options.compose2) {
			features.unshift('compose2');
		}

		Compose.auth();

		let { fields } = composeFieldsStore;

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

		composeEditor.writeMessage(composeEditorStore.texts.withAttach);

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
