'use strict';

let actions = require('../../../utils/actions');

let {auth, resetSignatures} = require('./meta');
let test = require('./meta/saveSignature');

const text = 'Текст подписи';

describe('Настройки. HTML подпись. Проверка сохранения подписи', () => {
	before(() => {
		auth();
	});

	describe('TESTMAIL-32971', () => {
		before(() => {
			resetSignatures();
		});

		it('Настройки. HTML подпись. Проверка сохранения отредактированной подписи ' +
			'(подпись одна, без картинки)', () => {
			test([{ text }]);
		});
	});
});
