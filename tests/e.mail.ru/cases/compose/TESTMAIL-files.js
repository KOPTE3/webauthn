'use strict';

let Messages = require('../../steps/messages');
let Compose = require('../../steps/compose');
let composeAttaches = require('../../steps/compose/attaches');


const files = [
	'1exp.JPG',
	'3xjELWi7Dww.tif',
	'бмп_лошадь.bmp'
];

describe('TESTMAIL-files', () => {
	before(() => {
		Compose.auth();
	});

	beforeEach(() => {
		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose',
			'compose2'
		]);

		Messages.open();
		Messages.toCompose();
	});

	it('Загрузка файлов', () => {
		composeAttaches.uploadAttach(files[0]);
		composeAttaches.uploadAttach(files[1]);
		composeAttaches.removeAttach(files[0]);
	});
});
