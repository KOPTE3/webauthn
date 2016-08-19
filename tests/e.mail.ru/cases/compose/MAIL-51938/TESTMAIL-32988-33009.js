'use strict';

let Compose = require('../../../steps/compose');
let Messages = require('../../../steps/messages');
let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let Compose2EditorSteps = require('../../../steps/compose2/editor');

let messagesToolbar = new MessagesToolbarSteps();
let compose2Editor = new Compose2EditorSteps();

let {auth} = require('./meta');
let createSignature = require('./meta/createSignature');
let test = require('./meta/checkChangeSignature');

const tests = [
	{
		testcase: 'TESTMAIL-32988',
		name: 'Написание письма. HTML подпись. AJAX. Проверка смены подписи ' +
		'(две подписи, по умолчанию - отредактирована через панель ' +
		'редактирования с картинкой, вторая - обычный текст)',
		open: () => {
			Messages.open();
			messagesToolbar.clickButton('compose');
			Compose.wait();
		},
		close: () => {
			// TODO
		}
	}
];

describe(() => {
	before(() => {
		auth();

		// TODO параметры
		createSignature();
	});

	tests.forEach(({ testcase, name, open, close, signatures }) => {
		describe(testcase, () => {
			it(name, () => {
				test(open, close, signatures);
			});
		});
	});
});
