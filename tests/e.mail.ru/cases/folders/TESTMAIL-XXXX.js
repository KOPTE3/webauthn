'use strict';

let Messages = require('../../steps/messages');
// let Folders = require('../../steps/folders');

describe('TESTMAIL-XXX', () => {
	it('Открытие списка папок', () => {
		Messages.auth();
		Messages.open();
	});
});
