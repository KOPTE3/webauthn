'use strict';

let { options = {
	name: 'Забытое вложение. Проверить отсутствие' +
	'попапа если слово-маркер есть в подписи'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';
let signature = require('./meta/signature');

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let LettersSteps = require('../../../steps/messages/letters');
let Messages = require('../../../steps/messages');
let Message = require('../../../steps/message');
let MessageFastReplySteps = require('../../../steps/message/fastreply');
let SentPage = require('../../../steps/sent');

let composeFieldsStore = require('../../../store/compose/fields');
let composeEditorStore = require('../../../store/compose/editor');
let actions = require('../../../utils/actions');

let composeFields = new ComposeFieldsSteps();
let composeEditor = new ComposeEditorSteps();
let composeControls = new ComposeControlsSteps();
let lettersSteps = new LettersSteps();
let messageToolbarSteps = new MessageToolbarSteps();
let messageFastReplySteps = new MessageFastReplySteps();

let Mail = require('../../../utils/mail');

const features = [
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark'
];

if (options.compose2) {
	features.unshift('compose2');
}

describe(options.name, () => {
	before(() => {
		Compose.auth();

		actions.setSignatures([composeEditorStore.texts.withAttach]);

		Messages.features(features);
		Messages.open();
	});

	describe('TESTMAIL-33271', () => {

		it('НЕ AJAX. Написание. ' + options.name, () => {
			signature({
				open () {
					Compose.features(features);
					Compose.open();
					composeEditor.wait();
				},

				send () {
					composeControls.send();
				}
			});
		});
	});

	describe('TESTMAIL-33285', () => {
		it('AJAX. Быстрый ответ на письмо. ' + options.name, () => {
			signature({
				open () {
					let fields = composeFieldsStore.fields;
					let mail = new Mail({
						to: fields.to,
						subject: fields.subject,
						text: composeEditorStore.texts.test
					});

					mail.send();

					Messages.features(features);
					Messages.open();

					lettersSteps.waitForNewestLetter();
					lettersSteps.openNewestLetter();

					Message.features(features);
					Message.refresh();

					messageFastReplySteps.clickButton('reply');

					composeEditor.wait();
				},

				send () {
					messageToolbarSteps.clickFastreplyButton('reply');
				}
			});
		});
	});

	describe('TESTMAIL-33284', () => {
		it('Из НЕ AJAX чтения. Полный ответ.' + options.name, () => {
			signature({
				open () {
					let fields = composeFieldsStore.fields;
					let mail = new Mail({
						to: fields.to,
						subject: fields.subject,
						text: composeEditorStore.texts.test
					});

					mail.send();

					Messages.features(features);
					Messages.open();

					lettersSteps.waitForNewestLetter();
					lettersSteps.openNewestLetter();

					messageToolbarSteps.clickButton('reply');

					composeEditor.wait();
				},

				send () {
					composeControls.send();
				}
			});
		});
	});


});
