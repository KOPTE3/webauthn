'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFieldsStore = require('../../store/compose/fields');

let composeFieldsStore = new ComposeFieldsStore();

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('TESTMAIL-31552: Написание письма. Забытое вложение. ' +
	'Проверить закрытие попапа по клику на кнопку "Прикрепить файл"', () => {
	before(() => {
		Compose.auth();
	});

	it('Проверяем содержимое леера', () => {
		Compose.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Compose.open();

		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', composeFieldsStore.fields.to);
		composeEditor.writeMessage(text);

		composeControls.send();
		missingAttachLayer.wait();

		missingAttachLayer.blockShouldHaveText(
			'head',
			'Вы не забыли прикрепить файл?'
		);

		missingAttachLayer.blockShouldHaveText(
			'desc',
			'Возможно, к письму должен быть прикреплён файл, однако он отсутствует.'
		);

		missingAttachLayer.blockShouldHaveText(
			'apply',
			'Всё равно отправить'
		);

		missingAttachLayer.blockShouldHaveText('cancel', 'Прикрепить файл');
		missingAttachLayer.close();
		missingAttachLayer.shouldBeClosed();
	});
});
