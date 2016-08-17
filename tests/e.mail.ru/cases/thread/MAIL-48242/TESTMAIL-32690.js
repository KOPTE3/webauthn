'use strict';

// Message
let Message = require('../../../steps/message');

// Messages
let Messages = require('../../../steps/messages');
let Toolbar = require('../../../steps/messages/toolbar');
let toolbar = new Toolbar();
let Letters = require('../../../steps/messages/letters');
let letters = new Letters();
let Search = require('../../../steps/search');
let search = new Search();
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
let ThreadFromsearch = require('../../../steps/thread/fromsearch');
let threadFromsearch = new ThreadFromsearch();
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

			/**
			 * Отправляет письмо
			 *
			 * @param {Object} params
			 */
			var sendMail = (params) => {
				let mail = new Mail(params);

				mail.send();
			};

			// получаем данным учетной записи дополнительной
			let data = authorization.credentials();
			let { fields } = composeFieldsStore;

			let sendData = {
				to: fields.to,
				from: data.email,
				subject,
				text,
				password: data.password
			};

			// отправляем письмо себе
			sendMail(sendData);

			// открываем письма
			Messages.open();

			// первое делаем прочитанным
			letters.openNewestLetter();

			// включаем группировку писем
			toolbar.toggleThreads(true, true);

			// еще одно письмо
			sendMail(sendData);

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
			search.waitForUrl(/\/search\//);

			// переходим на другую вкладку
			// ВАЖНО в браузере визуально в этом тесте вкладка не переключалась
			// хотя конекст менялся, а в другом тесте меняется
			// и не ясно почему так
			searchLetters.switchToNextTab();

			search.waitForUrl(/\/thread\//);

			ThreadFromsearch.wait();

			// смотрим чтобы было два письма в треде
			threadFromsearch.checkLettersCount(2);

			// проверяем что первое письмо в треде раскрыто
			threadFromsearch.checkExpandedLetter(0, true);
			// а второе свернуто
			threadFromsearch.checkExpandedLetter(1, false);
		});
	}
);
