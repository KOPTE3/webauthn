'use strict';

let Compose = require('../../../steps/compose');
let Messages = require('../../../steps/messages');
let Signature = require('../../../steps/settings/signature');
let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let Compose2EditorSteps = require('../../../steps/compose2/editor');

let messagesToolbar = new MessagesToolbarSteps();
let compose2Editor = new Compose2EditorSteps();

let {auth, resetSignatures} = require('./meta');

const filename = 'jpg.jpg';

const tests = [
	{
		testcase: 'TESTMAIL-32982',
		name: 'Написание письма. HTML подпись. AJAX. Проверка отображения html подписи',
		open: () => {
			Messages.open();
			messagesToolbar.clickButton('compose');
			Compose.wait();
		}
	},

	{
		testcase: 'TESTMAIL-32986',
		name: 'Написание письма. HTML подпись. НЕ AJAX. Проверка отображения html подписи',
		open: () => {
			Compose.open();
		}
	}
];

describe(() => {
	before(() => {
		auth();
		resetSignatures();

		Signature.open();
		Signature.hasWysiwyg();
		Signature.attachInline(filename);
		Signature.save();
	});

	tests.forEach(({ testcase, name, open }) => {
		describe(testcase, () => {
			it(name, () => {
				open();

				compose2Editor.hasInline();
			});
		});
	});
});
