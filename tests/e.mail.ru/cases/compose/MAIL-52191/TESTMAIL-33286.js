'use strict';

let { options = {}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Message = require('../../../steps/message');
let Messages = require('../../../steps/messages');
let MessageToolbarSteps = require('../../../steps/message/toolbar');
let MessageFastreplySteps = require('../../../steps/message/fastreply');
let LettersSteps = require('../../../steps/messages/letters');

let Compose = require(`../../../steps/${composeFolder}`);
let ComposeControlsSteps = require(`../../../steps/${composeFolder}/controls`);
let ComposeEditorSteps = require(`../../../steps/${composeFolder}/editor`);

let authStore = require('../../../store/authorization');
let composeFieldsStore = require('../../../store/compose/fields');

let Mail = require('../../../utils/mail');

let letters = new LettersSteps();
let messageToolbar = new MessageToolbarSteps();
let messageFastreply = new MessageFastreplySteps();
let composeEditor = new ComposeEditorSteps();
let composeControls = new ComposeControlsSteps();

let features = [
	'reattach-to-reply',
	'check-missing-attach',
	'disable-ballons',
	'no-collectors-in-compose',
	'disable-fastreply-landmark'
];
let fields, user, email;

let brokenAttachMeta = require('./meta/brokenAttach');

describe(() => {
	before(() => {
		Messages.auth();

		fields = composeFieldsStore.fields;
		let mail = new Mail({
			to: fields.to,
			subject: fields.subject,
			text: fields.text
		});

		mail.send();

		user = authStore.credentials();
		email = `${user.login}@${user.domain}`;
	});

	describe('TESTMAIL-33286', () => {
		it('НЕ AJAX: Быстрый ответ', () => {
			brokenAttachMeta({
				email,
				open () {
					Messages.features(features);
					Messages.open();
					letters.openBySubject(fields.subject);
					Message.refresh();
					messageFastreply.clickButton('reply');
					composeEditor.wait();
				},
				send () {
					messageToolbar.clickFastreplyButton('reply');
				},
				cancel () {
					messageToolbar.clickFastreplyButton('cancel');
				}
			});
		});
	});

	describe('TESTMAIL-33283', () => {
		it('НЕ AJAX: Полный ответ', () => {
			brokenAttachMeta({
				email,
				open () {
					Messages.features(features);
					Messages.open();
					letters.openBySubject(fields.subject);
					messageToolbar.clickButton('reply');
					Compose.wait();
					Compose.refresh();
				},
				send () {
					composeControls.send();
				},
				cancel () {
					composeControls.cancel();
				}
			});
		});
	});

	describe('TESTMAIL-33256', () => {
		it('Написание', () => {
			brokenAttachMeta({
				email,
				open () {
					Compose.features(features);
					Compose.open();
				},
				send () {
					composeControls.send();
				},
				cancel () {
					composeControls.cancel();
				}
			});
		});
	});

	after(() => {
		authStore.discard(user.id).catch(() => {
			throw new Error('Не освободили аккаунт после себя!');
		});
	});
});
