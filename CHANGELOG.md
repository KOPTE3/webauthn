# Changelog

## 2.5.0

Добавлен метод register для получения авторизационных данных вновь созданной учетной записи. 

## 2.4.0

* Добавлены методы для регрессионого тестирования средставами визуального сравнения:

```
 .compareDocument([options])
 .compareViewport([options])
 .compareElement(locator, [options])
```

Доступные опции:

```
options.hide {string[]}              Скрывает заданные элементы
options.remove {string[]}            Удаляет заданные элементы
options.widths {number[]}            Задает размер изображениям (desktop)
options.orientations {number[]}      Устанавливает ориентацию (mobile)
options.misMatchTolerance {number}   Задает границы поиска несоотвествий (от 0 до 100)
options.viewportChangePause {number} Устанавливает время ожидания после
                                     изменения раземеров вьюпорта
```

Пример использования в проекте themes.mail.ru:

**config.js**

```js
let VisualRegressionCompare = require('wdio-visual-regression-service/compare');

{
	/** Конфигурация для сервиса visual-regression */
	visualRegression: {
		compare: new VisualRegressionCompare.LocalCompare({
			referenceName : support.screenshot('./store/shots/expected'),
			screenshotName: support.screenshot('./store/shots/actual'),
			diffName      : support.screenshot('./store/shots/diff')
		})
	},

	/**
	 * Список сервисов, которые будет использоваться для запуска тестов
	 *
	 * selenium-standalone — позволяет автоматически запускать и останавливать
	 * работу selenium-сервера
	 */
	services: [
		/**
		 * Сервис для регрессионого тестирования через сравнение скриншотов
		 */
		'visual-regression'
	]
}
```

**cases/messages/TESTMAIL-34047.js**

```js
'use strict';

let Messages = require('../../steps/messages');
let { dimensions, config } = require('../../store');

let TIMEOUT = 30 * (60 * 1000);
let messages = new Messages();

describe('Темы. Общее соответствие оформления на списке писем', function () {
	this.timeout(TIMEOUT);

	before(() => {
		Messages.auth();
		Messages.open();
	});

	for (let theme in config) {
		for (let dimension of dimensions) {
			let { width, height } = dimension;

			it(`${theme}-${width}x${height}`, () => {
				messages.setTheme(theme);
				messages.setViewportSize(dimension);
				messages.compareDocument();
			});
		}
	}
});
```

**cases/messages/index.js**

```js
'use strict';

let assert = require('assert');

let MailMessagesSteps = require('@qa/yoda-e.mail.ru/steps/messages');
let MessagesPage = require('../../pages/messages');

let page = new MessagesPage();

/** Модуль для работы с шагами представления */
class MessagesSteps extends MailMessagesSteps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return page;
	}

	compareDocument () {
		let { hide } = page.locators;

		super.compareDocument({ hide });
	}
}

module.exports = MessagesSteps;
```

**pages/messages/index.js**

```js
'use strict';

let MailMessagesPages = require('@qa/yoda-e.mail.ru/pages/messages');

/** Модуль для работы с представлением */
class MessagesPage extends MailMessagesPages {
	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			/** Список интерактивных элементов, которые требуется исключить */
			hide: [
				'#leftcol-banners',
				'.b-datalist__head',
				'.pm-menu__center__inner',
				'#portal-headline',
				'#SeptimaFeedback',
				'.footer__theme-widget',
				'#footer__portal'
			]
		});
	}
}

module.exports = MessagesPage;
```

## 2.3.0

* В `steps` добавлен метод `setViewportSize` (статический метод помечен как deprecated) 

## 2.2.0

* В `store/system` добавлено свойство viewport 

## 2.1.4

* Добавлен развернутый комментарий для "Could not found cookie to continue"

## 2.1.3

* Исправлена авторизация типами `pdd` и `external`

## 2.1.2

* В [@qa/wdio-api](https://stash.mail.ru/projects/QA/repos/wdio-api/browse) была добавлена команда `getStyleProperty`


## 2.1.0

* Добавлен метод `inject`, который позволяет включать в тело страницы произвольный исполняемый код.
* В пакете [@qa/grunt-init-yoda](https://stash.mail.ru/projects/QA/repos/grunt-init-yoda/browse) получение тестовых файлов теперь происходит единожды для всех проектов (за счет симлинка на `~/.grunt-init/yoda/files`).


## 2.0.4

* Опция `--grep` теперь может работать независимо от `--suite`. 
Чтобы перейти на новую схему, в конфигах нужно заменить:
 
```
specs: [ './cases/**/*.js' ],
```
на 
 
```
specs: support.specs(/** [ ... ] */),
```

## 2.0.1-2.0.3

* Исправление багов и документации 

## 2.0.0

* В новом релизе осталась только базовая функционость:
	* steps
	* pages
	* store
	* store/authorization
	* store/authorization/accounts
	* store/authorization/providers
	* system
	* utils/account
	* utils/date
	* utils/url

Пример использования:

```js
let DefaultPage = require('@qa/yoda/pages');
let authorization = require('@qa/yoda/store/authorization');

class PageObject extends DefaultPage {
	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '#LEGO'
		};
	}
}
```

Что не было вынесено:

* Методы вызова серверных методов API, логирование запросов, модель работы с экшенами, методы создания пользователей. 
Чтобы перенести эту функциональность нужно время и понимание того как использовать код, который завязанный на клиентские библиотеки и объекты почты. Возможно этот вопрос будет решен в следующем релизе.

* Для разворачивания тестового окружения появился пакет [@qa/grunt-init-yoda](https://stash.mail.ru/projects/QA/repos/grunt-init-yoda/browse)
* В пакете [@qa/wdio-mocha-hooks](https://stash.mail.ru/projects/QA/repos/wdio-mocha-hooks/browse) исправлены методы `describe.skip` и `describe.only`
* Пакет `@qa/wdio-api-mail.ru` переименован в [@qa/wdio-api](https://stash.mail.ru/projects/QA/repos/wdio-api/browse)
* Пакет `@qa/test-files` переименован в [@qa/files](https://stash.mail.ru/projects/QA/repos/files/browse) (теперь устанавливается автоматически из [@qa/grunt-init-yoda](https://stash.mail.ru/projects/QA/repos/grunt-init-yoda/browse))
* Пакет `@qa/wd-capabilities` переименован в [@qa/wdio-capabilities](https://stash.mail.ru/projects/QA/repos/wdio-capabilities/browse)
* Пакет `@qa/grunt-test-runner` переименован в [@qa/grunt-yoda](https://stash.mail.ru/projects/QA/repos/grunt-yoda/browse)
* В пакет `@qa/wdio-api` добавлен метод `inject` для включения JS-файлов на страницу
* Исправлено создание автоматическое локальных конфигов (теперь конфиг будет создаваться единожды при инициализации тестового окружения и пересоздаваться с ключами `--init` или `--join` пакета [@qa/grunt-init-yoda](https://stash.mail.ru/projects/QA/repos/grunt-init-yoda/browse))
* В [@qa/account-manager](https://stash.mail.ru/projects/QA/repos/account-manager/browse) добавлена кука `qa`
* В степы добавлен методы `disableConfirm` и `switchToNextTab`

* Пример запуска тестов:

```
npm test -- --suite=login --grep=TESTMAIL-8674
```

Для запуска тестов локально вы можете использовать grunt напрямую:

```
grunt yoda --suite=compose
```

Но такой способ запуска не следует использовать в CI (лучше вообще не использовать), поскольку так будет использоваться глобальная grunt'а.


## 1.5.0

* Все фичи теперь сгруппированы по номеру таска

* В `describe` и `it` убраны паразитирующие асинхронные параметры  

* В eslint выключено `array-bracket-spacing` и `padded-blocks`   

Было:

```js
describe('НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для полного ответа с текстом в теле ' +
	'(текст для которого не должен появляться попап)', 
	() => {
		before(() => {
			Compose.auth();
		});
	}
);
```

Стало:

```js
describe('НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
	'Проверить отсутствие попапа для полного ответа с текстом в теле ' +
	'(текст для которого не должен появляться попап)',  () => {

	before(() => {
		Compose.auth();
	});
});
```

* Добавлены анонимные `describe`

Было:

```js
describe('TESTMAIL-31906', () => {});
```

Стало:

```js
describe(() => {});
```

Было:

```js
let name = path.basename((module.parent.options ? module.parent : module).filename, '.js');

describe(name, () => {});
```

Стало:

```js
describe(() => {});
```

* Префикс с номером таска в блоке `describe` подставляется автоматически:

Было:

```js
describe(('TESTMAIL-31697: Список писем. Сохранение поисковых запросов') => {});
```

Стало:

```js
describe(('Список писем. Сохранение поисковых запросов') => {});
```

## 1.4.0

* Добавлены учетные записи для OAuth-авторизации (включая социальные сервисы)

* Измненения в модуле TestTools.support:
	* Теперь в методе support:
		* Аргумент --grep также применяется к дополнительному набору тестов
		* Данные о тестовом наборе передаются в конструктор, а не в сам метод
		* Добавлен колбек для фильтрации тестов

	* Добавлен метод features, который возращает список фич по названиям директорий
	* Добавлен метод excluded, который возвращает список фич исключеных из прогона
	* Добавлен метод branches, который возвращает список проектных веток

* Исправлено поведение создания локального конфига. Теперь он создается только на локальной машине разработчика.
* Добавлен хук branches, который сохраняет во временный файл список проектных веток
* В конфигурационных файлах исправлен вызов метода TestTools#support.suites, который теперь умеет фильтровать тесты ориентируясь на операционное окружение.

* Удалены дубликаты методов

* Добавлена возможность создания учетных записей с заданными харакетеристиками (utils/add)


## 1.3.0

* Добавлены методы для работы с учетными записями пользователей:
	* `store/authorization/accounts.get`
	* `store/authorization.discard`

Теперь возможно получить учетную запись из локального хранилища.

* Добавлен набор методов для получения списка провайдеров с учетом различных фильтров, в т.ч. и топа:
	* `store/authorization/providers`

* Исправлена передача внешних опций командной строки (например, `--mochaOpts.timeout=90000`)

* Убран визуальный мусор глоба в debug-режиме

* Добавлен метод reload, который обновляет сессию

* Добавлен метод refresh, который обновляет страницу

* Кеш теперь чистится перед каждым запуском тестов

* Добавлена поддержка локальных конфигов

* Исправлены capabilities — теперь можно передавать дополнительные опции

* В тестовый набор теперь можно передавать дополниельные опции (например `exclude`, для исключения из прогона списка файлов).

* В capabilities добавлен Safari

* Теперь зафейленные тесты делают повторную попытку

* Исправлены умолчательные ошибки с waitUntil

* Исправлена публикация отчетов о прогоне в JIRA

* Добавлены новые команды:
	* addHiddenValue
	* setHiddenValue
	* waitForUrl

* Добавле автоматический запуск сервера

* Исправлено зависание системы при передаче несуществующего тестового набора

* В утилитах появилось несколько сущностей:
	* Константы
	* Вызовы внутреннего апи
	* Работа с фичами
	* Модуль для работы с Ajax запросами

* Добавлен хук, который проверяет обратно-несовместимые версии пакетов

* Обновлены пакеты:
	* account-manager
	* eslint-config-mail.ru
	* grunt-test-runner
	* test-runner
	* wd-capabilities
	* wdio-api-mail.ru
