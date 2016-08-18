'use strict';

let Signature = require('../../../steps/settings/signature');

const filenames = ['test.txt', 'doc.doc', 'pdf.pdf', 'bmp.bmp'];

describe(() => {
	before(() => {
		Signature.auth();

		Signature.features([
			'wysiwyg-signature',
			'wysiwyg-signature-inline-images',
			'compose2-inlinefromeditor'
		]);

		Signature.open();
		Signature.hasWysiwyg();
	});

	filenames.forEach((filename) => {
		it('Настройки. HTML подпись. Проверка работы кнопки Вставить картинку ' +
			'(несколько файлов, форматы, которые не вставляются картинками: ' +
			'txt, doc, pdf, bmp и др.): ' + filename, () => {
			Signature.attachInvalidInline(filename);
		});
	});
});
