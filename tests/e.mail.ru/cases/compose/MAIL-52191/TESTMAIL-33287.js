'use strict';

let { options = {
	name: 'НЕ AJAX. Ответ на письмо. Забытое вложение.' +
		' Проверить отсутствие попапа на быстром ответе после появления' +
		' попапа добавления аттачей из исходного письма'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeAttachesSteps = require(`../../../steps/${composeFolder}/attaches`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let Messages = require('../../../steps/messages');
let LettersSteps = require('../../../steps/messages/letters');
let MessageFastReplySteps = require('../../../steps/message/fastreply');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let ComposeReplyReattachLayer = require('../../../pages/layers/compose/replyReattach');
let NotifySteps = require('../../../steps/notify');
let SentPage = require('../../../steps/sent');

let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');
let authStore = require('../../../store/authorization');

let Mail = require('../../../utils/mail');

let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeAttaches = new ComposeAttachesSteps();
let composeControls = new ComposeControlsSteps();
let missingAttachLayer = new MissingAttachLayer();
let replyReattachLayer = new ComposeReplyReattachLayer();
let letters = new LettersSteps();
let messageFastReplySteps = new MessageFastReplySteps();
let messageToolbarSteps = new MessageToolbarSteps();
let notify = new NotifySteps();

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

		messageFastReplySteps.clickButton('reply');
		composeEditor.wait();

		composeFields.setFieldValue('cc',
			`${anotherAccount.login}@${anotherAccount.domain}`);

		composeEditor.writeMessage(composeEditorStore.texts.withAttach);

		messageToolbarSteps.clickFastreplyButton('reply');
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
