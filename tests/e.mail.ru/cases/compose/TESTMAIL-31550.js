'use strict';

let Compose = require('../../steps/compose');

let ComposeFields = require('../../steps/compose/fields');
let composeFields = new ComposeFields();

let ComposeEditor = require('../../steps/compose/editor');
let composeEditor = new ComposeEditor();

let ComposeControls = require('../../steps/compose/controls');
let composeControls = new ComposeControls();

let composeEditorStore = require('../../store/compose/editor');
let composeFieldsStore = require('../../store/compose/fields');

let actions = require('../../utils/actions');

let SentPage = require('../../steps/sent');

let ComposeAttaches = require('../../steps/compose/attaches');
let composeAttaches = new ComposeAttaches();


const subject = 'тестовая тема';

describe('TESTMAIL-31550: НЕ AJAX. Написание письма. Забытое вложение. Проверить отсутствие ' +
	'попапа при отправке текстов с аттачем (тексты для которых должен появляться попап)', () => {
	before(() => {
		Compose.auth();
	});


	it('письмо должно быть успешно отправлено', () => {
		let {fields} = composeFieldsStore;
		
		Compose.open();

		composeEditor.wait();

		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'disable-fastreply-landmark'
		]);

		Compose.refresh();

		composeFields.setFieldValue('subject', 'check attach');

		composeFields.setFieldValue('to', fields.to);

		composeEditor.writeMessage(composeEditorStore.texts.withAttach);

		composeAttaches.uploadAttach('1exp.JPG');

		composeControls.send();

		SentPage.wait();
	});
});
