'use strict';

let {auth} = require('./meta');
let test = require('./meta/saveSignature');

const text = 'Текст подписи';
const filename = 'jpg.jpg';
const initSignatures = ['подпись 1', 'подпись 2'];

const tests = [
	{
		testcase: 'TESTMAIL-32971',
		name: 'Настройки. HTML подпись. Проверка сохранения отредактированной подписи ' +
		'(подпись одна, без картинки)',
		signatures: [{ text }] // меняем текст
	},

	{
		testcase: 'TESTMAIL-32972',
		name: 'Настройки. HTML подпись. Проверка сохранения отредактированной подписи ' +
		'(подпись одна, с картинкой)',
		signatures: [{ filename }] // добавляем аттач
	},

	{
		testcase: 'TESTMAIL-32973',
		name: 'Настройки. HTML подпись. Проверка сохранения подписи, когда одну ' +
		'отредактировали (две подписи, без картинки)',
		initSignatures,
		signatures: [{ text }], // меняем только первый текст
		checkSignatures: [{ text }, { text: initSignatures[1] }]
	},

	{
		testcase: 'TESTMAIL-32974',
		name: 'Настройки. HTML подпись. Проверка сохранения подписи, когда одну ' +
		'отредактировали (две подписи, с картинкой)',
		initSignatures,
		initImages: [null, filename], // вторая подпись с картинкой
		signatures: [{ text }], // меняем только первый текст
		checkSignatures: [{ text }, { filename }]
	},

	{
		testcase: 'TESTMAIL-32975',
		name: 'Настройки. HTML подпись. Проверка сохранения ' +
		'двух отредактированных подписей (две подписи)',
		initSignatures,
		signatures: [{ text }, { text }] // меняем обе подписи на text
	},

	{
		testcase: 'TESTMAIL-32976',
		name: 'Настройки. HTML подпись. Проверка сохранения подписи, ' +
		'когда подпись НЕ редактировали через панель редактирования.',
		initSignatures: [text],
		signatures: [], // ничего не меняли, но нажали сохранить
		checkSignatures: [{ text }]
	}
];

describe(() => {
	before(() => {
		auth();
	});

	tests.forEach(({testcase, name, signatures, initSignatures, initImages, checkSignatures}) => {
		describe(testcase, () => {
			it(name, () => {
				test(signatures, initSignatures, initImages, checkSignatures);
			});
		});
	});
});
