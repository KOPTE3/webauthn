'use strict';

let all = require('.');

describe('TESTMAIL-32604', () => {
	before(() => {
		all.Steps.auth();

		all.Steps.features([
			'unsubscribe-letter-informer'
		]);

		all.FoldersSteps.open();
		all.FiltersSteps.enableCleaner();
		all.Steps.refresh();
		all.FiltersSteps.registerCleanerHook();
	});

	it('should create archive and subfolders', () => {
		let senderId = 1488; // noreply@youtube.com

		let letters = new all.LettersSteps();
		let informers = new all.InformersSteps();

		all.sendMessage(senderId);

		letters.openNewestLetter();

		// Почему-то хедер не всегда правильный. Используем вместо него гет-параметр.
		all.Steps.refresh({
			'senderinfo': senderId
		});

		informers.isUnsubscribeVisible();
	});
});
