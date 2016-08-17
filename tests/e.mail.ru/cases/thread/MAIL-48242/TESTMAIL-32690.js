'use strict';

// Messages
let Messages = require('../../../steps/messages');
let Toolbar = require('../../../steps/messages/toolbar');
let toolbar = new Toolbar();
let Letters = require('../../../steps/messages/letters');
let letters = new Letters();
let Search = require('../../../steps/search');
let SearchLetters = require('../../../steps/search/letters');
let searchLetters = new SearchLetters();

// Compose
let composeFieldsStore = require('../../../store/compose/fields');

// utils
let actions = require('../../../utils/actions');

// Search
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let advancedSteps = new AdvancedSteps();

let Mail = require('../../../utils/mail');
let Thread = require('../../../steps/thread');
let authorization = require('../../../store/authorization');

const subject = 'Тест';
const text = ' ';

describe(
	'Треды. Проверить открытие письма по ctrl+click в соседней вкладке ' +
		'с результатов поиска',
	() => {
		before(() => {
			Messages.auth();
		});

		it('Проверить открылось ли письмо', () => {
			// получаем данным учетной записи дополнительной
			let data = authorization.credentials();
			let { fields } = composeFieldsStore;

			// отправляем два письма не от себя
			for (let index of [,,]) {
				let mail = new Mail({
					to: fields.to,
					from: data.email,
					subject,
					text,
					password: data.password
				});

				mail.send();
			}

			// открываем письма
			Messages.open();

			// первое делаем прочитанным
			letters.openNewestLetter();

			// включаем группировку писем
			toolbar.toggleThreads(true, true);

			// TODO после того как выкатят изменения связанные с search
			// можно будет использовать обычный ввод а не расширенный
			// а сейчас пока так - чтобы работало

			// вводим в строку поиска тему
			portalSearchSteps.toggleAdvanced();
			advancedSteps.setFieldText('subject', subject);
			advancedSteps.clickSubmit();

			// проверяем что два письма
			searchLetters.checkLettersCount(2);

			// проверяем что есть письмо с темой
			searchLetters.checkLetterBySubject(subject);

			// ctrl + click на первом письме
			searchLetters.openNewestLetterInTab();

			// проверяем что открыта все таже страница поиска и не было перехода
			Search.wait();

			// TODO бага какая-то с переключением никак не возможно
			// переключиться на следующую вкладку

			browser.pause(3000);

			let tabs = browser.getTabIds();

			console.log(tabs);
			let current = browser.getCurrentTabId();

			console.log(current);
			let actual = tabs.find(id => id !== current);

			console.log(actual);

			console.log(1, browser.getCurrentTabId());

			browser.window(actual);

			browser.switchTab(actual);
			console.log(2, browser.getCurrentTabId());

			console.log(browser.getHTML('body'));

			// Thread.wait();
			browser.pause(3000);

			// проверяем
			// верхнее письмо будет развернуто

			// нижнее свернуто

		});
	}
);
