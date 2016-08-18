'use strict';

let Signature = require('../../../steps/settings/signature');
let Compose2EditorSteps = require('../../../steps/compose2/editor');

let compose2Editor = new Compose2EditorSteps();

let {auth, resetSignatures} = require('./meta');

const filenames = ['jpg.jpg', 'test1.png', 'file30.gif'];

describe(() => {
	before(() => {
		auth();
		resetSignatures();
	});

	beforeEach(() => {
		Signature.open();
		Signature.hasWysiwyg();
	});

	filenames.forEach((filename) => {
		it('Настройки. HTML подпись. Проверка работы кнопки ' +
			'Вставить картинку (несколько картинок, формат jpg, png, gif): ' + filename, () => {
			Signature.attachInline(filename);
			compose2Editor.hasInline();
		});
	});

});
