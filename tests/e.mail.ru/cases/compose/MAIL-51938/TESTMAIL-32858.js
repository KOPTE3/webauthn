'use strict';

let Signature = require('../../../steps/settings/signature');
let Compose2 = require('../../../steps/compose2');
let SentPage = require('../../../steps/sent');
let Messages = require('../../../steps/messages');
let Compose2EditorSteps = require('../../../steps/compose2/editor');
let Compose2FieldsSteps = require('../../../steps/compose2/fields');
let Compose2ControlsSteps = require('../../../steps/compose2/controls');
let LettersSteps = require('../../../steps/messages/letters');
let LetterBodySteps = require('../../../steps/message/body');
let LetterHeadSteps = require('../../../steps/message/head');
let LetterAttachesSteps = require('../../../steps/message/attaches');

let compose2Editor = new Compose2EditorSteps();
let compose2Fields = new Compose2FieldsSteps();
let compose2Controls = new Compose2ControlsSteps();
let letters = new LettersSteps();
let letterBody = new LetterBodySteps();
let letterHead = new LetterHeadSteps();
let letterAttaches = new LetterAttachesSteps();

let composeFieldsStore = require('../../../store/compose/fields');

let {auth, resetSignatures, cleanInbox} = require('./meta');

const filename = 'jpg.jpg';

describe(() => {
	before(() => {
		auth('compose2');
		resetSignatures();

		Signature.open();
		Signature.hasWysiwyg();
		Signature.attachInline(filename);
		Signature.save();
	});

	it('Чтение письма. HTML подпись. Проверка, что в пришедшем письме ' +
		'подпись с картинкой корректно отображается и не прикрепился файл картинки.', () => {
		let { fields } = composeFieldsStore;

		Compose2.open();
		compose2Editor.hasInline();

		compose2Fields.setFieldValue('to', fields.to);
		compose2Fields.setFieldValue('subject', fields.subject);
		compose2Editor.writeMessage(fields.text);
		compose2Controls.send();
		SentPage.wait();

		Messages.open();
		letters.waitForNewestLetter();
		letters.checkLetterBySubject(fields.subject);
		letters.isNewestLetterWithoutAttaches();

		letters.openNewestLetter();
		letterBody.hasInline();
		letterHead.noAttaches();
		letterAttaches.noAttaches();
	});

	after(() => {
		cleanInbox();
	});
});
