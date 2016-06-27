'use strict';

let page = require('../../steps/compose');
let fields = require('../../steps/compose/fields');
let editor = require('../../steps/compose/editor');
let controls = require('../../steps/compose/controls');
let popups = require('../../steps/compose/popups');

describe('TESTMAIL-31547' +
	'НЕ AJAX. Написание письма. Забытое вложение.' +
   	'Проверить появление попапа при отправке текстов ' +
  	'(тексты для которых должен появляться попап)', () => {
	beforeEach(function () {
		page.auth();

		page.addFeature('check-missing-attach');
		page.addFeature('disable-ballons');

		page.open();
	});

	it('Уважаемый Сергей Михайлович!', () => {
		fields.setFieldValue('subject', 'check attach');
		fields.setFieldValue('to', 'i.burlak@corp.mail.ru');

		editor.writeMessage('Уважаемый Сергей Михайлович!\n' +
		' Электролаборатория ООО"Универсал-1" предлагает ' +
		' Вам свои услуги в области электроизмерений\n' +
		' и испытаний электрооборудования ( т.н. "прозвонке")\n ' +
		' учреждений дошкольного и школьного образования\n' +
		' Вашего ТУ департамента образования г.Волгограда.\n ' +
		' Во вложенном файле наше Предложение, реквизиты, ' +
		' адрес электронной почты и телефон для связи\n' +
		' С уважением к Вам, Директор ООО "Универсал-1"Александр Ротин .');

		try {
			controls.compose();
			popups.getPopup('missingAttach');
		} catch (error) {
			console.log(error);
		}
	});
});
