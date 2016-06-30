'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeEditor = require('../../steps/compose/editor');
let composeControls = require('../../steps/compose/controls');
let missingAttachLayer = require('../../steps/layers/missingAttach');
let composeEditorStore = require('../../store/compose/editor');
let ComposeFiledsStore = require('../../store/compose/fields');
let composeFiledsStore = new ComposeFiledsStore();

const text = 'Добрый день! Во вложении заявка, прошу скинуть счет на оплату.';

describe('TESTMAIL-31552: Написание письма. Забытое вложение. ' +
	'Проверить закрытие попапа по клику на кнопку "Прикрепить файл"', () => {
	before(Compose.auth);

	it('проверяем содержимое леера', () => {
		Compose.addFeature('check-missing-attach');
		Compose.addFeature('disable-ballons');
		Compose.addFeature('no-collectors-in-compose');

		Compose.open();
		composeFields.setFieldValue('subject', 'check attach');
		composeFields.setFieldValue('to', composeFiledsStore.fields.to);
		composeEditor.writeMessage(text);

		composeControls.send();
		missingAttachLayer.show();

		missingAttachLayer.blockShouldHaveText(
			'head',
			'Вы не забыли прикрепить файл?'
		);

		missingAttachLayer.blockShouldHaveText(
			'desc',
			'Возможно, к письму должен быть прикреплен файл, однако он отсутствует.'
		);

		missingAttachLayer.blockShouldHaveText(
			'apply',
			'Все равно отправить'
		);

		missingAttachLayer.blockShouldHaveText('cancel', 'Прикрепить файл');
		missingAttachLayer.close();
		missingAttachLayer.shoulBeClosed();
	});
});
