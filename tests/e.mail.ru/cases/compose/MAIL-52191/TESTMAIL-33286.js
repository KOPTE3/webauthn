'use strict';

let { options = {
	name: 'НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить появление попапа на полном ответе ' +
	'если в письме был заблокирован аттач'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Message = require('../../../steps/message');
let Messages = require('../../../steps/messages');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let MessageFastreplySteps = require('../../../steps/message/fastreply');
let LettersSteps = require('../../../steps/messages/letters');


let Compose = require(`../../../steps/${composeFolder}`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeAttachesSteps = require(`../../../steps/${composeFolder}/attaches`);

let MissingAttachLayer = require('../../../steps/layers/missingAttach');
let NotifySteps = require('../../../steps/notify');

let authStore = require('../../../store/authorization');
let composeFieldsStore = require('../../../store/compose/fields');
let composeEditorStore = require('../../../store/compose/editor');

let Mail = require('../../../utils/mail');

let notify = new NotifySteps();
let letters = new LettersSteps();
let messageToolbar = new MessageToolbarSteps();
let messageFastreply = new MessageFastreplySteps();
let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeControls = new ComposeControlsSteps();
let composeAttaches = new ComposeAttachesSteps();
let missingAttachLayer = new MissingAttachLayer();

let filename = 'broken.scr';
let anotherAccount;

describe(() => {
	before(() => {
		Messages.auth();

		let features = [
			'reattach-to-reply',
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		];

		let { fields } = composeFieldsStore;
		let mail = new Mail({
			to: fields.to,
			subject: fields.subject,
			text: fields.text
		});

		mail.send();

		Messages.features(features);
		Messages.open();

		letters.waitForNewestLetter();
		letters.openNewestLetter();

		if (options.fastReply) {
			Message.refresh();
			messageFastreply.clickButton('reply');
			composeEditor.wait();
		} else {
			messageToolbar.clickButton('reply');
			Compose.wait();
			Compose.refresh();
		}

		anotherAccount = authStore.credentials();
	});

	it(options.name, () => {
		composeFields.setFieldValue('to',
			`${anotherAccount.login}@${anotherAccount.domain}`);
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);
		composeAttaches.uploadAttachWithoutCheck(filename);
		notify.wait('error', `Файл ${filename} заблокирован в целях безопасности.`, 'contains');

		if (options.fastReply) {
			messageToolbar.clickFastreplyButton('reply');
		} else {
			composeControls.send();
		}

		missingAttachLayer.wait();
		missingAttachLayer.checkTexts();
	});

	after(() => {
		authStore.discard(anotherAccount.id).catch(() => {
			throw new Error('Не освободили аккаунт после себя!');
		});
	});
});
