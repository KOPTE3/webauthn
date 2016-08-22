'use strict';

let Signature = require('../../../../steps/settings/signature');

const text = 'Текст подписи';
const filename = 'jpg.jpg';

/**
 * Модуль создает нужные подписи
 *
 * @param {*[]} signatures
 */
module.exports = ({signatures, signatureBeforeText}) => {
	Signature.open();
	Signature.removeAllSignatures();
	Signature.hasWysiwyg();

	signatures.forEach(({image, isDefault}, index) => {
		if (index) {
			Signature.addSignature();
		}

		if (image) {
			Signature.attachInline(filename, index);
		} else {
			Signature.setSignature(text, 1);
		}

		if (isDefault) {
			Signature.setDefaultSignature(index);
		}
	});

	Signature.checkSignatureBeforeQuotation(false);

	if (signatureBeforeText) {
		Signature.toggleSignatureBeforeQuotation();
		Signature.checkSignatureBeforeQuotation(true);
	}

	Signature.save();
};
