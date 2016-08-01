'use strict';


let Compose = require('../../../steps/compose');
let ComposeFields = require('../../../steps/compose/fields');
let composeFields = new ComposeFields();
let ComposeEditor = require('../../../steps/compose/editor');
let composeEditor = new ComposeEditor();
let ComposeControls = require('../../../steps/compose/controls');
let composeControls = new ComposeControls();
let composeEditorStore = require('../../../store/compose/editor');
let composeFieldsStore = require('../../../store/compose/fields');
let actions = require('../../../utils/actions');
let SentPage = require('../../../steps/sent');
let ComposeAttaches = require('../../../steps/compose/attaches');
let composeAttaches = new ComposeAttaches();

// mail
let Mail = require('../../../utils/mail');

const subject = 'TESTMAIL-31955';

describe('TESTMAIL-31955: НЕ AJAX. Черновики. Забытое вложение. ' +
	'Проверить отсутствие попапа при отправке с текстом и аттачем из шаблона ' +
	'(добавление аттача после применения шаблона)', done => {
	before(() => {
		Compose.auth();
	});

	it('письмо должно быть успешно отправлено', () => {
		let {fields} = composeFieldsStore;

		var mail = new Mail({
			to: '',
			subject,
			text: composeEditorStore.texts.withoutAttach
		});

		mail.template();

		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Compose.open();

		composeEditor.wait();

		Compose.refresh();

		composeEditor.wait();

		composeControls.applyTemplate();

		composeAttaches.uploadAttach('1exp.JPG');

		composeFields.setFieldValue('to', fields.to);

		composeControls.send();

		SentPage.wait();
	});
});
