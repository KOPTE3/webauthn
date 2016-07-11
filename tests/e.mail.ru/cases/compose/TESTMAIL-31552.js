'use strict';

let Compose = require('../../steps/compose');
let ComposeFields = require('../../steps/compose/fields');
let ComposeEditor = require('../../steps/compose/editor');
let ComposeControls = require('../../steps/compose/controls');
let MissingAttachLayer = require('../../steps/layers/missingAttach');
let composeFieldsStore = require('../../store/compose/fields');

let composeFields = new ComposeFields();
let composeEditor = new ComposeEditor();
let composeControls = new ComposeControls();
let missingAttachLayer = new MissingAttachLayer();

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
