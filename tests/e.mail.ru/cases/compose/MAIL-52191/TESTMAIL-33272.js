'use strict';

let { options = {
	name: 'НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа на быстром ответе ' +
	'в письме с инлайн аттачем (в теле письма и в цитате)'
}} = module.parent;

let composeFolder = 'compose2';

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeAttachesSteps = require(`../../../steps/${composeFolder}/attaches`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let SentPage = require('../../../steps/sent');

let Message = require('../../../steps/message');
let Messages = require('../../../steps/messages');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let MessageFastreplySteps = require('../../../steps/message/fastreply');
let LettersSteps = require('../../../steps/messages/letters');


let Login = require('../../../steps/login');
let LoginFormSteps = require('../../../steps/login/form');

let composeEditorStore = require('../../../store/compose/editor');

let Mail = require('../../../utils/mail');

let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeAttaches = new ComposeAttachesSteps();
let composeControls = new ComposeControlsSteps();
let messageFastreply = new MessageFastreplySteps();

let messageToolbar = new MessageToolbarSteps();
let letters = new LettersSteps();

let loginFormSteps = new LoginFormSteps();

let user = {
	email: 'ok_nez135@mail.ru',
	password: 'qwerty@6'
};

const features = [
	'reattach-to-reply',
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark',
	'compose2',
	'compose2-inlinefromeditor'
];


let subject = 'Тест';
let text = 'Письмо';

describe(() => {
	before(() => {
		Login.open();
		loginFormSteps.send({
			Login: user.email,
			Password: user.password
		});
		Messages.wait();
	});

	it(options.name, () => {
		const filename = '1exp.JPG';

		Compose.features(features);
		Compose.open();

		composeFields.setFieldValue('to', user.email);
		composeFields.setFieldValue('subject', subject);
		composeAttaches.attachInline(filename);
		composeControls.send();
		SentPage.wait();

		Messages.features(features);
		Messages.open();

		letters.waitForNewestLetter();
		letters.openNewestLetter();
		Message.refresh();

		messageFastreply.clickButton('reply');
		composeEditor.wait();

		composeEditor.writeMessage(composeEditorStore.texts.withAttach);
		composeAttaches.attachInline(filename);
		messageToolbar.clickFastreplyButton('reply');
		SentPage.wait();
	});
});
