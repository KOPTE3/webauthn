'use strict';

let { options = {
	name: 'Забытое вложение. ' +
	'Проверить отсутствие попапа на ответе ' +
	'в письме с инлайн аттачем (в теле письма и в цитате)'
}} = module.parent;

let composeFolder = 'compose2';

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);

let Message = require('../../../steps/message');
let Messages = require('../../../steps/messages');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let MessageFastreplySteps = require('../../../steps/message/fastreply');
let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let LettersSteps = require('../../../steps/messages/letters');

let Login = require('../../../steps/login');
let LoginFormSteps = require('../../../steps/login/form');

let composeEditor = new ComposeEditorSteps();
let composeControls = new ComposeControlsSteps();
let messageFastreply = new MessageFastreplySteps();
let messagesToolbar = new MessagesToolbarSteps();

let messageToolbar = new MessageToolbarSteps();
let letters = new LettersSteps();

let loginFormSteps = new LoginFormSteps();

let test = require('./meta/inline-blockqoute');

let user = {
	email: 'ok_nez135@mail.ru',
	password: 'qwerty@6'
};

describe(options.name, () => {
	before(() => {
		Login.open();
		loginFormSteps.send({
			Login: user.email,
			Password: user.password
		});
		Messages.wait();
	});

	describe('TESTMAIL-33255', () => {
		it('AJAX. Быстрый ответ', () => {
			test({
				email: user.email,
				response: true,
				open () {
					messageFastreply.clickButton('reply');
					composeEditor.wait();
				},
				send () {
					messageToolbar.clickFastreplyButton('reply');
				}
			});
		});
	});

	describe('TESTMAIL-33272', () => {
		it('НЕ AJAX. Быстрый ответ', () => {
			test({
				email: user.email,
				response: true,
				open () {
					Message.refresh();
					messageFastreply.clickButton('reply');
					composeEditor.wait();
				},
				send () {
					messageToolbar.clickFastreplyButton('reply');
				}
			});
		});
	});

	describe('TESTMAIL-33274', () => {
		it('AJAX. Полный ответ', () => {
			test({
				email: user.email,
				response: true,
				open () {
					messageToolbar.clickButton('reply');
					Compose.wait();
				},
				send () {
					composeControls.send();
				}
			});
		});
	});

	describe('TESTMAIL-33276', () => {
		it('НЕ AJAX. Полный ответ', () => {
			test({
				email: user.email,
				response: true,
				open () {
					messageToolbar.clickButton('reply');
					Compose.wait();
					Compose.refresh();
				},
				send () {
					composeControls.send();
				}
			});
		});
	});

	describe('TESTMAIL-33256', () => {
		it('Из НЕ AJAX чтения. Полный ответ', () => {
			test({
				email: user.email,
				response: true,
				open () {
					Message.refresh();
					messageToolbar.clickButton('reply');
					Compose.wait();
				},
				send () {
					composeControls.send();
				}
			});
		});
	});

	describe('TESTMAIL-33254', () => {
		it('AJAX. Написание', () => {
			test({
				email: user.email,
				open () {
					Compose.open();
				},
				send () {
					composeControls.send();
				}
			});
		});
	});

	describe('TESTMAIL-33270', () => {
		it('НЕ AJAX. Написание', () => {
			test({
				email: user.email,
				open () {
					Messages.open();
					messagesToolbar.clickButton('compose');
					Compose.wait();
				},
				send () {
					composeControls.send();
				}
			});
		});
	});
});
