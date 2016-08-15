'use strict';

let { options = {
	name: 'НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для быстрой пересылки ' +
	'с текстом в цитате, с аттачем (исходное письмо с аттачем)'
}} = module.parent;

let composeFolder = 'compose2';

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeAttachesSteps = require(`../../../steps/${composeFolder}/attaches`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let SentPage = require('../../../steps/sent');

let Messages = require('../../../steps/messages');
let Login = require('../../../steps/login');
let LoginFormSteps = require('../../../steps/login/form');

let composeEditorStore = require('../../../store/compose/editor');

let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeAttaches = new ComposeAttachesSteps();
let composeControls = new ComposeControlsSteps();

let loginFormSteps = new LoginFormSteps();

let user = {
	email: 'ok_nez135@mail.ru',
	password: 'qwerty@6'
};

describe(() => {
	before(() => {
		const features = [
			'reattach-to-reply',
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark',
			'compose2',
			'compose2-inlinefromeditor'
		];

		Login.open();
		loginFormSteps.send({
			Login: user.email,
			Password: user.password
		});
		Messages.wait();

		Compose.features(features);
		Compose.open();
	});

	it(options.name, () => {
		const filename = 'pic.jpg';

		composeAttaches.registerAddLogger();

		composeFields.setFieldValue('to', user.email);
		composeEditor.writeMessage(composeEditorStore.texts.withAttach);

		composeAttaches.attachInline(filename);
		composeControls.send();
		SentPage.wait();
	});
});
