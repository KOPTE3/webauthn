'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');
let actions = require('../../utils/actions');
let SentPage = require('../../steps/sent');
let composeAttaches = require('../../steps/compose/attaches');


const subject = 'тестовая тема';

describe('TESTMAIL-31543: Написание письма. Забытое вложение. Проверить отсутствие попапа при' +
	' отправке текстов с аттачем (тексты для которых должен появляться попап)', () => {
	before(() => {
		Compose.auth();
	});


	composeEditorStore.classifierTest.lettersWithoutAttach.forEach(function (text) {
		it('письмо должно быть успешно отправлено', () => {
			let {fields} = new ComposeFieldsStore();

			Compose.features([
				'check-missing-attach',
				'disable-ballons',
				'no-collectors-in-compose',
				'disable-fastreply-landmark'
			]);

			Compose.open();

			composeEditor.wait();

			composeFields.setFieldValue('subject', 'check attach');

			composeFields.setFieldValue('to', fields.to);

			composeEditor.writeMessage(text);

			composeAttaches.uploadAttach('1exp.JPG');

			composeControls.send();

			SentPage.wait();
		});
	});
});
