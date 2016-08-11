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
let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeControls = new ComposeControlsSteps();
let composeAttaches = new ComposeAttachesSteps();
let missingAttachLayer = new MissingAttachLayer();

let filename = 'broken.scr';
let anotherAccount;

describe(() => {
	before(() => {
		let { fields } = composeFieldsStore;
		let mail = new Mail({
			to: fields.to,
			subject: fields.subject,
			text: fields.text
		});

		mail.send();

		anotherAccount = authStore.credentials();
	});

	beforeEach(() => {
		const features = [
			'reattach-to-reply',
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		];

		Messages.auth();
		Messages.features(features);
		Messages.open();

		letters.waitForNewestLetter();
		letters.openNewestLetter();

		if (options.fastReply) {
			Message.refresh();
			messageToolbar.clickFastreplyButton('reply');
			Compose.wait();
		} else {
			messageToolbar.clickButton('reply');
			Compose.wait();
			Compose.refresh();
		}
	});

	it(options.name, () => {
		composeFields.setFieldValue('to',
			`${anotherAccount.login}@${anotherAccount.domain}`);

		composeEditor.writeMessage(composeEditorStore.texts.withAttach);
		composeAttaches.uploadAttachWithoutCheck(filename);

		notify.wait('error', `Файл ${filename} заблокирован в целях безопасности.`, 'contains');

		composeControls.send();
		replyReattachLayer.wait();

		composeControls.send();
		missingAttachLayer.wait();
		missingAttachLayer.checkTexts();
	});

	after(() => {
		authStore.discard(anotherAccount.id).catch(() => {
			throw new Error('Не освободили аккаунт после себя!');
		});
	});
});
