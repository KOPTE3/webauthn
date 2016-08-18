'use strict';

let Signature = require('../../../../steps/settings/signature');

let {resetSignatures} = require('../meta');

module.exports = (signatures, initSignatures, initImages, checkSignatures) => {
	if (!checkSignatures) {
		checkSignatures = signatures;
	}

	// выставляем начальную подпись
	resetSignatures(initSignatures);

	if (initImages) {
		Signature.open();
		Signature.hasWysiwyg();

		initImages.forEach((filename, index) => {
			if (filename) {
				Signature.attachInline(filename, index);
			}
		});

		Signature.save();
	}

	// Открываем страницу
	Signature.open();
	Signature.hasWysiwyg();

	// Меняем подписи
	signatures.forEach(({text, filename}, index) => {
		if (text) {
			Signature.setSignature(text, index);
		}

		if (filename) {
			Signature.attachInline(filename, index);
		}
	});

	Signature.save();

	// Проверяем сохранение
	Signature.open();

	checkSignatures.forEach(({text, filename}, index) => {
		if (text) {
			Signature.checkSignature(text, index);
		}

		if (filename) {
			Signature.hasInline(index);
		}
	});
};
