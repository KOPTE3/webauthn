'use strict';

let { options = {
	name: 'AJAX. Ответ на письмо. Забытое вложение. Проверить отсутствие' +
    'попапа на полном ответе после появления попапа добавления аттачей из ' +
    'исходного письма'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let Messages = require('../../../steps/messages');
let Message = require('../../../steps/message');

let LettersSteps = require('../../../steps/messages/letters');
let letters = new LettersSteps();

let MessageToolbarSteps = require('../../../steps/message/toolbar');
let messageToolbar = new MessageToolbarSteps();

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbar = new MessagesToolbarSteps();

let ComposeFieldsSteps = require(`../../../steps/${composeFolder}/fields`);
let composeFields = new ComposeFieldsSteps();

let composeFieldsStore = require('../../../store/compose/fields');
let authStore = require('../../../store/authorization');

let Mail = require('../../../utils/mail');
let messagesUtils = require('../../../utils/messages');
let messageUtils = require('../../../utils/message');

const attach = 'file3.txt';

let anotherAccount;

describe(() => {

	before(() => {
        const features = [
            'reattach-to-reply',
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		];

        Compose.auth();

        let { fields } = composeFieldsStore;
        anotherAccount = authStore.credentials();

        var mail = new Mail({
            to: fields.to,
            subject: fields.subject,
            text: ''
        });

        mail.addAttach(attach);
        mail.send();

        Messages.features(features);
        Messages.open();

        letters.waitForNewestLetter();
        letters.openNewestLetter();

        messageToolbar.clickButton('reply');
        Compose.wait();

        composeFields.setFieldValue('cc', `${anotherAccount.login}@${anotherAccount.domain}`);
	});

    after(() => {
        authStore.discard(anotherAccount.id).catch(() => {
            throw new Error('Не освободили аккаунт после себя!')
        });
    });

	it(options.name, () => {


        browser.debug();

		// composeEditor.writeMessage(composeEditorStore.texts.withAttach);
        //
		// composeControls.send();
        //
		// missingAttachLayer.wait();
		// try {
		// 	missingAttachLayer.checkTexts();
		// } catch (error) {
		// 	throw new Error(error);
		// } finally {
		// 	try {
		// 		missingAttachLayer.close();
		// 		missingAttachLayer.shouldBeClosed();
		// 	} catch (error) {
		// 		throw new Error(error);
		// 	} finally {
		// 		composeEditor.wait();
		// 		composeControls.cancel();
		// 	}
		// }
	});
});
