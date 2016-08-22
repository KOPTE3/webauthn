'use strict';

let SentPage = require('../../../steps/sent');
let Compose2 = require('../../../steps/compose2');
let Messages = require('../../../steps/messages');
let Signature = require('../../../steps/settings/signature');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let Compose2EditorSteps = require('../../../steps/compose2/editor');
let Compose2FieldsSteps = require('../../../steps/compose2/fields');
let Compose2ControlsSteps = require('../../../steps/compose2/controls');
let LettersSteps = require('../../../steps/messages/letters');
let LetterBodySteps = require('../../../steps/message/body');
let LetterHeadSteps = require('../../../steps/message/head');
let LetterAttachesSteps = require('../../../steps/message/attaches');

let actions = require('../../../utils/actions');
let composeFieldsStore = require('../../../store/compose/fields');
let composeEditorStore = require('../../../store/compose/editor');

let letters = new LettersSteps();
let compose2Editor = new Compose2EditorSteps();
let messageToolbar = new MessageToolbarSteps();
let compose2Fields = new Compose2FieldsSteps();
let compose2Controls = new Compose2ControlsSteps();
let letterBody = new LetterBodySteps();
let letterHead = new LetterHeadSteps();
let letterAttaches = new LetterAttachesSteps();


let {auth, resetSignatures, cleanInbox} = require('./meta');

const filename = 'jpg.jpg';

const tests = [
	{
		testcase: 'TESTMAIL-33023',
		name: 'Полный ответ на письмо. HTML подпись. AJAX. ' +
		'Проверка отправки и пришедшего письма с html подписью',
		open: () => {
			let { fields: composeFields } = composeFieldsStore;

			actions.sendMessage(
				composeFields.to,
				composeFields.from,
				composeFields.subject,
				composeEditorStore.texts.withAttach
			);

			Messages.open();
			letters.waitForNewestLetter();
			letters.openNewestLetter();
			messageToolbar.clickButton('reply');
			Compose2.wait();
		}
	},

	{
		testcase: 'TESTMAIL-33026',
		name: 'Полный ответ на письмо. HTML подпись. НЕ AJAX. ' +
		'Проверка отправки и пришедшего письма с html подписью',
		open: () => {
			Messages.open();
			letters.openNewestLetter();
			messageToolbar.clickButton('reply');
			Compose2.refresh();
		}
	}
];

describe(() => {
	before(() => {
		auth('compose2');
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

				let { fields: composeFields } = composeFieldsStore;

				compose2Fields.setFieldValue('to', composeFields.to);
				compose2Fields.setFieldValue('subject', composeFields.subject);
				compose2Editor.writeMessage(composeFields.text);
				compose2Controls.send();
				SentPage.wait();

				Messages.open();
				letters.waitForNewestLetter();
				letters.checkLetterBySubject(composeFields.subject);
				letters.isNewestLetterWithoutAttaches();

				letters.openNewestLetter();
				letterBody.hasInline();
				letterHead.noAttaches();
				letterAttaches.noAttaches();
			});
		});
	});

	after(() => {
		cleanInbox();
	});
});
