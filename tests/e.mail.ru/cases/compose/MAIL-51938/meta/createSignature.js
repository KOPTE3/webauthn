'use strict';

let Signature = require('../../../../steps/settings/signature');

const text = 'Текст подписи';
const filename = 'jpg.jpg';

/**
 * Модуль создает нужные подписи
 *
 * @param {*[]} signatures
 */
module.exports = (signatures) => {
	Signature.open();
	Signature.removeAllSignatures();
	Signature.hasWysiwyg();

	// Первая подпись с картинкой
	Signature.attachInline(filename);

	// Вторая - текст
	Signature.addSignature();
	Signature.setSignature(text, 1);

	Signature.save();
};
